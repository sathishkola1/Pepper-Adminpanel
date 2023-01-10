const express=require('express')
const router=new express.Router()
const user=require('../models/user')
const auth=require('../middleware/auth')

router.post('/api/admin/login',async(req,res)=>{
    try{
        let User = await user.findByCredentials(req.body.email,req.body.password)
        let token = await User.generateAuthToken()
        res.send({status:"ok",token})
    }
    catch(err){
        res.status(400).send({status:"Error"})
    }
})

router.get('/api/admin/logout',auth,async (req,res)=>{
    try {
        req.User.tokens=req.User.tokens.filter((token)=>token.token!==req.token)
        await req.User.save()
        res.send({msg:"successfully logged out"})
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
