const express=require('express')
const router=new express.Router()
const component = require('../models/components')
const auth=require('../middleware/auth')

router.get('/api/components',async(req,res)=>{
    try{
        let components = await component.find()
        components = components[0]
        res.send({text:components.text,image:components.image,count:components.count})
    }
    catch(err){
        res.status(500).send({status:"Error",err})
        console.log(err)
    }
})

router.patch('/api/components/update',auth,async(req,res)=>{
    try{
        let {text,image} = req.body
        let components = await component.find()
        components = components[0]
        if(text){
           components.text = text
        }
        if(image){
           components.image = image
        }
        await components.save()
        res.send({text,image})
    }
    catch(err){
        res.status(400).send({status:"error",err})
    }
})

router.get('/api/components/increment-count',async(req,res)=>{
    try{
        let components = await component.find()
        components = components[0]
        components.count +=  1
        await components.save()
        res.send({msg:"Successfull"})
    }
    catch(err){
        res.status(400).send({status:"error",err})
    }
})

module.exports = router