const Combo = require('../models/Combo')
const router = require("express").Router()
const bcrypt = require("bcrypt")
const multer = require("multer")
const upload = multer({ dest: 'uploads/'})
const fs = require('fs')
const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET // Click 'View API Keys' above to copy your API secret
});
const cloudinaryUploader = require("../config/cloudinaryConfig")



// Create: 
router.get("/new", (req,res)=>{
    res.render("combo.ejs")
})

// router.post("/new", upload.single('video') , async(req,res)=> {
//      console.log(req.body)
//     try {
//         await Combo.create(req.body)
//         // req.file    
//         res.redirect("/combos")
//     } catch(error){
//         console.log(error)
//     }

// })
// Mohammed and Omar Route Cloudinary
router.post("/omar",cloudinaryUploader.single("video"),async(req,res)=>{
    console.log(req.file)
})


// for video upload: 
router.post("/new", upload.single('video'), async (req, res) => {
    try {
        if (req.session.user) {
        let post = req.body
        if (req.file) {
            const uploadResult = await cloudinary.uploader
                .upload(
                    `./uploads/${req.file.filename}`,
                    {
                        resource_type: "video", // make sure video is the correct string/ "word" to specify it is a video.
                        public_id: req.file.originalname
                    }
                )
                .catch((error) => {
                    console.log(error);
                });
            await fs.rmSync(`./uploads/${req.file.filename}`, {
                force: true,
            });
            post.video = uploadResult.secure_url
        }
        post.file = null
        post.creator = req.session.user._id
        await Post.create(post)
        res.redirect("/combos")
    }
    } catch (error){
        console.log(error)
    }

})








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

router.get("/:comboId", async (req,res)=>{
    try{
        const oneComboDetail = await Combo.findById(req.params.comboId)
        res.render("oneCombo.ejs", {oneComboDetail})
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



// update: 
router.get("/:comboId/update", async (req,res)=> {
    try{
        const foundCombo = await Combo.findById(req.params.comboId)
        res.render("combo-update.ejs", {foundCombo})
    }
    catch(error){
        console.log(error)
    }
})

router.put("/:comboId", async (req, res)=>{
    try{
    const updatedCombo = await Combo.findByIdAndUpdate(req.params.comboId, req.body)
    console.log(req.body)
    console.log(updatedCombo)
    res.redirect("/combos")
    }
    catch (error){
        console.log(error)
    }
})






module.exports = router

