const router = require('express').Router()

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController")
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("../middlewares/verifyToken.js")

router.get("/", verifyTokenAndAuth, getAllUsers)
router.get("/:id", getUserById)
router.put("/:id", updateUser)
router.delete("/:id", verifyToken, deleteUser)

module.exports = router