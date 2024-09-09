const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token
  if(authHeader){
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if(error) res.status(401).json("Token is not valid")
      req.user = user
      next()
    })
  }else{
    return res.status(401).json("You are not authenticated !")
  }
}

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.id === req.params.id || req.payload.isAdmin){
      next()
    }else{
      res.status(403).json("You are not allowed to perform this taks!")
    }
  })
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.role === "admin"){
      next()
    }else{
      res.status(403).json("You are not allowed to perform this taks!")
    }
  })
}

module.exports = {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin
}