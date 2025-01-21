const router = require("express").Router()
const jwt = require("jsonwebtoken")
const jwt_decode = require("jwt-decode")

const Event = require("../models/event")

async function getId(token) {
    const res = await fetch("http://127.0.0.1:4000/user/login", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const jwtToken = await res.json()
    jwt.verify(jwtToken)

    const decodedToken = jwtDecode(jwtToken)

    const userId = decodedToken.id

    return userId
}

router.get("/", async (req, res) => {
    try {
        const allEvents = await Event.findById(getId(token))

        res.status(200).json(allEvents)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.post("/create", async (req, res) => {
    try {
        const userId = getId()
        const {
            eventName,
            startTime,
            eventLength,
            createdBy
        } = req.body
        if (
            !eventName ||
            !startTime ||
            !eventLength ||
            !createdBy
        ) {
            throw new Error("Please provide all properties")
        }

        const newEvent = new Event({ eventName, startTime, eventLength, createdBy })

        await newEvent.save()

        res.status(201).json({
            message: "New event created",
            newEvent
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params

        const foundEvent = await Event.findOne({ _id: id })

        if (!foundEvent) throw new Error("Event not found")

            res.status(200).json(foundEvent)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params

        const updatedEvent = await Event.findByIdAndUpdate(id, {
            eventName : req.body.eventName ?? eventName,
            startTime : req.body.startTime ?? startTime,
            eventLength : req.body.eventLength ?? eventLength,
            createdBy : req.body.createdBy ?? createdBy
        })

        res.status(200).json({
            message: "Event modified",
            updatedEvent
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params

        const deletedEvent = await Event.findByIdAndDelete(id)

        if (!deletedEvent) throw new Error("Event not found")

        res.status(200).json({
            message: `${id} removed from the db`,
            deletedEvent
        })

        save(restof, dbPath)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

module.exports = router