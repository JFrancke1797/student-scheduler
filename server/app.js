require("dotenv").config()
const express = require("express")
const app = express()

const PORT = process.env.PORT
const HOST = process.env.HOST

const { dbConnect } = require("./db")

app.listen(PORT, HOST, () => {
    dbConnect(),
    console.log(`[server] listening on ${HOST}:${PORT}`)
})