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
    api_secret: process.env.APISECRET 
});
const cloudinaryUploader = require("../config/cloudinaryConfig")



router.get("/home", (req,res)=> {
    res.render("home.ejs")
})


router.get("/character-select", (req,res)=>{
    res.render("character-select.ejs")
})


router.get("/uploadAkuma", (req,res)=>{
    res.render("upload-akuma.ejs")
})
    
 
router.post("/uploadAkuma", cloudinaryUploader.single("video") , async(req,res)=> {
     console.log(req.body)
     console.log(req.file)
    try {

        let comboObject = {
            character: req.body.character,
            starter: req.body.starter,
            description: req.body.description,
            resource: req.body.resource,
            user: req.body.user,
            video: req.file?.path || req.body?.link,
             
        }

        await Combo.create(comboObject)
          
        res.redirect("/combos/akuma")
    } catch(error){
        console.log(error)
    }

})






router.get("/uploadKen", (req,res)=>{
    res.render("upload-ken.ejs")
})

router.post("/uploadKen", cloudinaryUploader.single("video") , async(req,res)=> {
     console.log(req.body)
     console.log(req.file)
    try {

        let comboObject = {
            character: req.body.character,
            starter: req.body.starter,
            description: req.body.description,
            resource: req.body.resource,
            user: req.body.user,
            video: req.file?.path || req.body?.link,
        }

        await Combo.create(comboObject)
          
        res.redirect("/combos/ken")
    } catch(error){
        console.log(error)
    }

})

router.get("/ken", async (req,res) => {
    try{
        const kenCombos = await Combo.find({
            character: "ken"
        }).populate('user')   
        console.log(kenCombos) 
        kenCombos.forEach(element => {
            const splitYoutube = element.video.split("/watch?v=")
            if (splitYoutube[0] === 'https://www.youtube.com'){
            element.video=`${splitYoutube[0]}/embed/${splitYoutube[1]}`
            }
        }); 
        res.render("ken-all-combos.ejs", {kenCombos: kenCombos})
    }
    catch(error){
        console.log(error)
    }
})


router.get("/akuma", async (req,res) => {
    try{
        const akumaCombos = await Combo.find({
            character: "akuma"
        })    
        akumaCombos.forEach(element => {
            const splitYoutube = element.video.split("/watch?v=")
            if (splitYoutube[0] === 'https://www.youtube.com'){
            element.video=`${splitYoutube[0]}/embed/${splitYoutube[1]}`
            }
        }); 
        res.render("akuma-all-combos.ejs", {akumaCombos: akumaCombos})
    }
    catch(error){
        console.log(error)
    }
})


router.get("/:comboId", async (req,res)=>{
    try{
        const oneComboDetail = await Combo.findById(req.params.comboId)
        const splitYoutube = oneComboDetail.video.split("/watch?v=")
        console.log(splitYoutube)
        if (splitYoutube[0] === 'https://www.youtube.com' || splitYoutube[0] === "https://youtu.be"){
        console.log(splitYoutube)
        oneComboDetail.video=`${splitYoutube[0]}/embed/${splitYoutube[1]}`
        res.render("oneCombo.ejs", {oneComboDetail})
    }
    }
    catch(error){
        console.log(error)
    }
})




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




router.get("/akuma/:comboId/update", async (req,res)=> {
    try{
        const foundCombo = await Combo.findById(req.params.comboId)
        res.render("akuma-update.ejs", {foundCombo})
    }
    catch(error){
        console.log(error)
    }
})

router.put("/akuma/:comboId",cloudinaryUploader.single("video") , async (req, res)=>{
    try{
    let comboObject = {
            character: req.body.character,
            starter: req.body.starter,
            description: req.body.description,
            resource: req.body.resource,
            video: req.file?.path || req.body?.link,
        }
    console.log(req.params.comboId);
    const updatedCombo = await Combo.findByIdAndUpdate(req.params.comboId, comboObject)
    console.log(req.body)
    console.log(updatedCombo)
    res.redirect("/combos/akuma")
    }
    catch (error){
        console.log(error)
    }
})



router.get("/ken/:comboId/update", async (req,res)=> {
    try{
        const foundCombo = await Combo.findById(req.params.comboId)
        res.render("ken-update.ejs", {foundCombo})
    }
    catch(error){
        console.log(error)
    }
})

router.put("/ken/:comboId",cloudinaryUploader.single("video") , async (req, res)=>{
    try{
    let comboObject = {
            character: req.body.character,
            starter: req.body.starter,
            description: req.body.description,
            resource: req.body.resource,
            video: req.file?.path || req.body?.link,
        }
    console.log(req.params.comboId);
    const updatedCombo = await Combo.findByIdAndUpdate(req.params.comboId, comboObject)
    console.log(req.body)
    console.log(updatedCombo)
    res.redirect("/combos/ken")
    }
    catch (error){
        console.log(error)
    }
})






module.exports = router



