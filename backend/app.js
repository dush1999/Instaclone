const express = require("express")
const app = express()
const PORT = process.env.port || 5000;
const {mongUrl} = require('./keys')
const cors = require("cors")
const mongoose = require('mongoose')
const path = require("path")

app.use(cors())
require('./models/models')
require('./models/post')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/user'))
app.use(require('./routes/createpost'))

mongoose.connect(mongUrl)

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to MongoDb")
})

mongoose.connection.on("error", () => {
    console.log("Not connected to MongoDb")
})

// serving the frontend
app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})

app.listen(PORT, () => {
    console.log("Server is running on port" + " " + PORT)
})