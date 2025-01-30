const { mongoose } = require("../db")

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
        otp: {
            type: String
        },
        otpExpiration: {
            type: Date
        },
        role: { //property is "role"
            type: String,
            enum: ["User", "Admin"], // Enum to specify allowed roles
            default: "User", // Default role
        },
    },
    { collection: "userData" } // collection is named "userData"
)
    module.exports = mongoose.model("User", userData)