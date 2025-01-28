const { mongoose } = require("../db")

const Event = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true
        },
        createdBy: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("event", Event)