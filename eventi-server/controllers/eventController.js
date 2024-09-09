const Event = require('../models/Event.js')
const User = require('../models/User.js')

const getEvents = async (req, res) => {
  try {
    const eventByName = req.query.name
    let events

    if(eventByName) events = await Event.find({name: eventByName})
    else events = await Event.find().sort({ createdAt: -1 })

    res.status(200).json(events)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

// const { flyer } = req.body
    // const uploadRes = await cloudinary.uploader.upload(
    //   image,
    //   {
    //     upload_preset: 'position_images',
    //     resource_type: 'image',
    //   },
    // )

const createEvent = async (req, res) => {
  try {
    // console.log(req.body)

    // let user = await User.findOne({_id: req.body.author.id})
    // if(user) console.log(user)

    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' })
    // }

    // if (!user.events) {
    //   user.events = []; 
    // }

    const newEvent = new Event(req.body)
    const savedEvent = await newEvent.save()

    // user.events.push(savedEvent)
    // await user.save()

    res.status(201).json(savedEvent)
  } catch (error) {
    res.status(500).json(error)
    console.log("Something went wrong: ", error)
  }
}

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json(error)
  }
}
const getEventsByUserId = async (req, res) => {
  try {
    const events = await Event.find()
    const userEvents = events.filter(e => e.author.id === req.params.id)

    res.status(200).json(userEvents)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getEventByDate = async (req, res) => {
  try {
    const event = await Event.findById(req.query.date)
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateEvent = async (req, res) => {
   try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedEvent)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id)
    res.status(200).json("Event has been deleted !")
  } catch (error) {
    res.status(500).json(error)
  }
}

const likeEvent = async (req, res) => {
  try {
    const { userId, isLiked } = req.body
    const eventId = req.params.id

    const event = await Event.findById(eventId)
    const user = await User.findById(userId)

    if(isLiked === false){
      if(event) event.likes.push(userId)
      if(user) user.favourites.push(event)
      event.save()
      user.save()

      res.json({liked: true})
    }
   
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  getEvents,
  getEventById,
  getEventsByUserId,
  getEventByDate,
  createEvent,
  updateEvent,
  deleteEvent,
  likeEvent
}