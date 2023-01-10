const mongoose = require('mongoose')
const user = require('../models/user')
const component = require('../models/components')
require('dotenv').config()

const url = process.env.MONGODB

mongoose.connect(url,{useNewUrlParser:true})