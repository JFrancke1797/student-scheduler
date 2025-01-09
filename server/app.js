require("dotenv").config()
const express = require("express")
const app = express()
const cors = require('cors');
const PORT = process.env.PORT
const HOST = process.env.HOST

const { dbConnect } = require("./db")
const sessionValidation = require("./middlewares/session");
const eventsController = require("./controllers/eventRoutes")
const authController = require("./controllers/user-routes");


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/user-routes", authController);
app.use("/events", sessionValidation, eventsController)

app.listen(PORT, HOST, () => {
    dbConnect(),
    console.log(`[server] listening on ${HOST}:${PORT}`)
})