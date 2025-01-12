require("dotenv").config()
console.log(".env variables working")
const express = require("express")
const cors = require("cors")
const app = express()
const cors = require('cors');
const PORT = process.env.PORT
const HOST = process.env.HOST

const { dbConnect } = require("./db")
const sessionValidation = require("./middlewares/session");
const eventsController = require("./controllers/eventRoutes")
<<<<<<< HEAD
const userController = require("./controllers/user-routes"); // Import your auth routes
=======
const authController = require("./controllers/user-routes");

>>>>>>> b2499701468f252decba6d1294e63b3c8a16ba37

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
<<<<<<< HEAD
app.use("/events", eventsController)
app.use("/user", userController)
=======
app.use("/user-routes", authController);
app.use("/events", sessionValidation, eventsController)
>>>>>>> b2499701468f252decba6d1294e63b3c8a16ba37

app.listen(PORT, HOST, () => {
    dbConnect(),
    console.log(`[server] listening on ${HOST}:${PORT}`)
})