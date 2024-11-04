const express = require("express");
const router = express.Router();

router.post("/quiz" , async (req,res)=>{
    try{
        let data = await getQuestions(req.body)
        res.send({status:true , questions : data})
    }
    catch{(err)=>
        res.send({status: false , message : err})
    }
})