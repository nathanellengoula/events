const router = require('express').Router()
const multer = require('multer');
const upload = multer();

const {
  getEvents,
  getEventById,
  getEventsByUserId,
  createEvent,
  updateEvent,
  likeEvent,
  deleteEvent
} = require ('../controllers/eventController.js')
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("../middlewares/verifyToken.js")

router.get('/', getEvents)
router.get('/:id', getEventById)
router.get('/findUserEvents/:id', getEventsByUserId)
router.post('/', verifyToken, upload.none(), createEvent)
router.put('/:id', updateEvent)
router.post('/like/:id', verifyToken, likeEvent)
router.delete('/delete/:id', verifyToken, deleteEvent)


module.exports = router