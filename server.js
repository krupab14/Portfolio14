const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

require('dotenv').config();

const PORT = process.env.PORT
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mob: Number,
    subject: String,
    message: String,
})

let userModel = mongoose.model('portfolio_collection', userSchema)

app.post('/submit', async (req, res) => {
    const { name, email, mob, subject, message } = req.body
    try {
        const newUser = new userModel({ name, email, mob, subject, message })
        await newUser.save()
        console.log('User added!!')
        res.status(200).send('User added successfully!')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error saving user.')
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

// frontend data 

