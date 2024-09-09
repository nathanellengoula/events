const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const mysql = require('mysql')
const multer = require('multer')
const cloudinary = require('cloudinary').v2;

//Importing routes
const authRoutes = require('./routes/authRoute.js')
const userRoutes = require('./routes/userRoute.js')
const eventsRoutes = require('./routes/eventRoute.js')

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json({limit: '25mb'}))
app.use(express.urlencoded({extended: true, limit: '25mb'}))

//Connecting server and mongo database
app.listen(process.env.PORT, () => {console.log("Server listening on port " + process.env.PORT)})
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL)
        .then(console.log("Database connected !"))
        .catch(error => console.error(error))

//Creating endpoints for the routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/events', eventsRoutes)
































































        //Cloudinary Configuration 
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.SECRET_KEY
// });

// app.post("/post", async (req, res) =>{
//   try {
//     const {message, image} = req.body
//     const uploadRes = await cloudinary.uploader.upload(
//       image, 
//       {
//         upload_preset: 'position_images',
//         resource_type: 'image',
//       },
//     )
//     console.log(uploadRes)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json(error)
//   }
// })






































// To actually upload files into AWS S3 bucket, we need a way for the 
// express server to log into our AWS account and perform actions that we need
// And for this we need an AWS service that is called IAM
// So we need to do 2 things: the first is to create a user to represent our web app
// And the web app will be able to access the AWS account and access the S3 bucket
// the second thing to make is a policy. A policy defines the rules tha t can be accessed by a user
// So, we will define a policy to define exactly how the web app will access the S3 bucket and perform certain actions