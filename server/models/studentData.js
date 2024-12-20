const { mongoose } = require("../db")
//isAdmin might need changing
const isAdmin = require("../middlewares/isAdmin")
//schema stripped down - user entered data
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
                require: true
            },
            beginTime: {
                type: String,
                require: true
            },
            endTime: {
                type: String,
                require: true
            },

            
        }
    )
//enter parameters when established
    module.exports = mongoose.model("", )