const { mongoose } = require("../db")
//isAdmin must be present in auth
// const isAdmin = require("../middlewares/isAdmin")

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
        role: { //property is "role"
            type: String,
            enum: ["User", "Admin"], // Enum to specify allowed roles
            default: "User", // Default role
        },
    },
    { collection: "userData" } // collection is named "userData"
)
    module.exports = mongoose.model("User", userData)