const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
const connectDB = require('./config/db')
// router
const router = require('./routes/index.js')

const app = express();
app.use(cors())
app.use(express.json())

const PORT = 8080 || process.env.PORT

app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    })
})

// api routers
app.use('/api', router)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running");
    })
})