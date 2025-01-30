const { mongoose } = require("../db")

const Event = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        startDate: {
            type: String,
        },
        createdBy: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("event", Event)