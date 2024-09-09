const User = require('../models/User.js')
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  const { username, email, password, pic } = req.body
   try {
    const newUser = new User({
      username, 
      email, 
      pic,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString()
    })
    const userAdded = await newUser.save()
    res.status(201).json(userAdded)
   } catch (error) {
    res.status(500).json(error)
   }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    !user && res.json({message: "Wrong credentials"})

    const hashPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET)
    const pass = hashPass.toString(CryptoJS.enc.Utf8)
    pass !== req.body.password && res.json({message: "Wrong credentials"})

    const { password, ...others } = user._doc

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      }, 
      process.env.JWT_SECRET,
      {expiresIn: "2d"},
    )


    res.status(200).json({ user: { ...others, accessToken }})
  } catch (error) {
    res.status(500).json(error)
  }
}


module.exports = {login, register}