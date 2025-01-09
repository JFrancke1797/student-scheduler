require("dotenv").config()
console.log(".env variables working")
const express = require("express")
const cors = require("cors")
const app = express()

const PORT = process.env.PORT
const HOST = process.env.HOST

const { dbConnect } = require("./db")
const eventsController = require("./controllers/eventRoutes")
const userController = require("./controllers/user-routes"); // Import your auth routes

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/events", eventsController)
app.use("/user", userController)

app.listen(PORT, HOST, () => {
    dbConnect(),
    console.log(`[server] listening on ${HOST}:${PORT}`)
})