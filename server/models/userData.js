const { mongoose } = require("../db")
//isAdmin must be present in auth
<<<<<<< HEAD
//const isAdmin = require("../middlewares/session")
=======
// const isAdmin = require("../middlewares/isAdmin")
>>>>>>> b2499701468f252decba6d1294e63b3c8a16ba37
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