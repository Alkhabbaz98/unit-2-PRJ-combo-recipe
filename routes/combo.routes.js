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


// Home Page: 
router.get("/home", (req,res)=> {
    res.render("home.ejs")
})

// character select page:
router.get("/character-select", (req,res)=>{
    res.render("character-select.ejs")
})

// Create for Akuma: 
router.get("/uploadAkuma", (req,res)=>{
    res.render("upload-akuma.ejs")
})
    
// Upload for Akuma 
router.post("/uploadAkuma", cloudinaryUploader.single("video") , async(req,res)=> {
     console.log(req.body)
     console.log(req.file)
    try {

        let comboObject = {
            character: req.body.character,
            starter: req.body.starter,
            description: req.body.description,
            resource: req.body.resource,
            video: req.file?.path || req.body?.link,
             
        }
        // await Combo.create(req.file.path)
        // req.file
        await Combo.create(comboObject)
          
        res.redirect("/combos/akuma")
    } catch(error){
        console.log(error)
    }

})





// Create For Ken
router.get("/uploadKen", (req,res)=>{
    res.render("upload-ken.ejs")
})
// Upload for Ken
router.post("/uploadKen", cloudinaryUploader.single("video") , async(req,res)=> {
     console.log(req.body)
     console.log(req.file)
    try {

        let comboObject = {
            character: req.body.character,
            starter: req.body.starter,
            description: req.body.description,
            resource: req.body.resource,
            video: req.file?.path || req.body?.link,
        }
        // await Combo.create(req.file.path)
        // req.file
        await Combo.create(comboObject)
          
        res.redirect("/combos/ken")
    } catch(error){
        console.log(error)
    }

})





// Mohammed and Omar Route Cloudinary
// router.post("/omar",cloudinaryUploader.single("video"),async(req,res)=>{
//     console.log(req.file)

// })

// for video upload: 
// router.post("/new", upload.single('video'), async (req, res) => {
//     try {
//         if (req.session.user) {
//         let post = req.body
//         if (req.file) {
//             const uploadResult = await cloudinary.uploader
//                 .upload(
//                     `./uploads/${req.file.filename}`,
//                     {
//                         resource_type: "video", // make sure video is the correct string/ "word" to specify it is a video.
//                         public_id: req.file.originalname
//                     }
//                 )
//                 .catch((error) => {
//                     console.log(error);
//                 });
//             await fs.rmSync(`./uploads/${req.file.filename}`, {
//                 force: true,
//             });
//             post.video = uploadResult.secure_url
//         }
//         post.file = null
//         post.creator = req.session.user._id
//         await Post.create(post)
//         res.redirect("/combos")
//     }
//     } catch (error){
//         console.log(error)
//     }

// })








// Show all list and in the list there should be a delete button:
// Ken Combos
router.get("/ken", async (req,res) => {
    try{
        const kenCombos = await Combo.find({
            character: "ken"
        })    
        res.render("ken-all-combos.ejs", {kenCombos: kenCombos})
    }
    catch(error){
        console.log(error)
    }
})

// Akuma combos
router.get("/akuma", async (req,res) => {
    try{
        const akumaCombos = await Combo.find({
            character: "akuma"
        })
        res.render("akuma-all-combos.ejs", {akumaCombos: akumaCombos})
    }
    catch (error){
        console.log(error)
    }
})



router.get("/:comboId", async (req,res)=>{
    try{
        const oneComboDetail = await Combo.findById(req.params.comboId)
        // Check if the video is a youtube video or not
        // if its a youtube video pass a isYoutubeVideo boolean to the view
        // in the ejs if the isYoutubeVideo is true
        
        const splitYoutube = oneComboDetail.video.split("/watch?v=")
        console.log(splitYoutube)
        if (splitYoutube[0] === 'https://www.youtube.com'){
        console.log(splitYoutube)
        oneComboDetail.video=`${splitYoutube[0]}/embed/${splitYoutube[1]}`
        res.render("oneCombo.ejs", {oneComboDetail})
    }
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
        res.redirect("/combos/ken")
    }
    catch(error){
        console.log(error)
    }
})



// akuma update: 
router.get("/akuma/:comboId/update", async (req,res)=> {
    try{
        const foundCombo = await Combo.findById(req.params.comboId)
        res.render("akuma-update.ejs", {foundCombo})
    }
    catch(error){
        console.log(error)
    }
})

router.put("/akuma/:comboId", async (req, res)=>{
    try{
        console.log(req.params.comboId);
    const updatedCombo = await Combo.findByIdAndUpdate(req.params.comboId, req.body)
    console.log(req.body)
    console.log(updatedCombo)
    res.redirect("/combos/akuma")
    }
    catch (error){
        console.log(error)
    }
})


// ken update
router.get("/ken/:comboId/update", async (req,res)=> {
    try{
        const foundCombo = await Combo.findById(req.params.comboId)
        res.render("ken-update.ejs", {foundCombo})
    }
    catch(error){
        console.log(error)
    }
})

router.put("/ken/:comboId", async (req, res)=>{
    try{
         console.log(req.params.comboId);
    const updatedCombo = await Combo.findByIdAndUpdate(req.params.comboId, req.body)
    console.log(req.body)
    console.log(updatedCombo)
    res.redirect("/combos/ken")
    }
    catch (error){
        console.log(error)
    }
})






module.exports = router

