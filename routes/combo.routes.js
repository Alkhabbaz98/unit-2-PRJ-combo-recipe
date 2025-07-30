const Combo = require('../models/Combo')
const router = require("express").Router()
const bcrypt = require("bcrypt")
const multer = require("multer")
const upload = multer({ dest: 'uploads/'})
const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET // Click 'View API Keys' above to copy your API secret
});



// Create: 
router.get("/new", (req,res)=>{
    res.render("combo.ejs")
})

router.post("/new", upload.single('video') , async(req,res)=> {
     console.log(req.body)
    try {
        await Combo.create(req.body)
        // req.file    
        res.redirect("/combos")
    } catch(error){
        console.log(error)
    }

})

// router.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
// })



// Show all list and in the list there should be a delete button:
router.get("/", async (req,res) => {
    try{
        const allCombos = await Combo.find()
        res.render("all-combos.ejs", {allCombos: allCombos})
    }
    catch(error){
        console.log(error)
    }
})








// Delete: 
router.delete("/:comboId" , async (req,res)=>{
    try{
        const delectedCombo = await Combo.findByIdAndDelete(req.params.comboId)
        console.log(req.params.comboId)
        res.redirect("/combos")
    }
    catch(error){
        console.log(error)
    }
})










module.exports = router

