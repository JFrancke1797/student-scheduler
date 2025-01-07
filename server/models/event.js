const { mongoose } = require("../db")

const Event = mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true
        },
        eventLength: {
            type: Number,
            required: true
        },
    }
)

module.exports = mongoose.model("event", Event)