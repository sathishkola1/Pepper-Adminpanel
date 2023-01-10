const mongoose = require('mongoose')
const validator = require('validator')

const component = mongoose.model('Component',{
    text:{
        type:String
    },
    image:{
        type:String,
        validate(value){
            if(!validator.isURL(value,{ protocols: ['http','https','ftp'], require_tld: true, require_protocol: true })){
                throw new Error("Invalid url")
            }
        }
    },
    count:{
        type:Number
    }
})

module.exports = component
