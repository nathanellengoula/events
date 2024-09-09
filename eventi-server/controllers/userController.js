const User = require("../models/User")
const CryptoJS = require("crypto-js")

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc
    res.status(200).json(others)
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateUser = async (req, res) => {
  if(req.body.password){
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, 
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted !")
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}