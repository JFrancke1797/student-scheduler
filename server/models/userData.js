const { mongoose } = require("../db")
//isAdmin must be present in auth
const isAdmin = require("../middlewares/isAdmin")
const userData = mongoose.Schema(
    
    {
        
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        isAdmin: {
            type: Boolean,
            default: true
        }
    }
)
//enter parameters when established
    module.exports = mongoose.model("", )