const { mongoose } = require("../db")
//isAdmin might need changing
const isAdmin = require("../middlewares/isAdmin")
//schema pulled from demographics/parents/school data page - change/update if needed
const studentData = mongoose.Schema(
    {
        
            firstName: {
                type: String,
                require: true
            },
            lastName: {
                type: String,
                require: true
            },
            mtgType: { //drop down menu, in person/virtual
                type: String,
                require: true,
            },
            mtgLocation: {
                type: String,
                require: false
            },
            
        }
    )
//enter parameters when established
    module.exports = mongoose.model("", )