const Combo = require('../models/Combo')
const router = require("express").Router()
const bcrypt = require("bcrypt")




router.get("/new", (req,res)=>{
    res.render("combo.ejs")
})

router.post("/new", async(req,res)=> {
     console.log(req.body)
    try {
        await Combo.create()
        res.redirect("/combos")
    } catch(error){
        console.log(error)
    }

})











module.exports = router

