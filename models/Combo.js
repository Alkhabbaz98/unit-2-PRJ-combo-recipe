const {model, Schema} = require("mongoose")

const comboSchema = new Schema({
    character: {
        type:String,
        required: true,
    },
    starter:{
        type:String,
        required: true,
        
    },
    description:{
        type:String,
        required: true,
    },
    resource:{
        type:String,
        required: true,
    },
    video:{
        type:String,
        // default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNYRu8LA0MWpRLTDJCQEq3talVZsczYlQjCQ&s",
        // requried: true,
    },
    link:{
        type:String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Combo = model("Combo",comboSchema)

module.exports = Combo