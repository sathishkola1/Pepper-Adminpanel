const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid')
            }
        },
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }
    ]
})

userSchema.pre('save',async function(next){
    
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function(){
    let token=jwt.sign({_id:this._id.toString()},process.env.JWT_SECRET)
    this.tokens=this.tokens.concat({token})
    await this.save()
    return token
}

userSchema.statics.findByCredentials=async (email,password)=>{
    let User= await user.findOne({email})
    if(!User){
        throw new Error("Invalid Credentials")
    }
    let isMatch=await bcrypt.compare(password,User.password)
    if(!isMatch){
        throw new Error("Invalid Credentials")
    }
    return User
}

const user = mongoose.model('User', userSchema)

module.exports = user