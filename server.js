
const express = require("express") 
const app = express() 
const dotenv = require("dotenv").config() 
const morgan = require("morgan")
const methodOverride = require("method-override")
const conntectToDB = require('./config/db')
const authRoutes = require("./routes/auth.routes")
const session = require("express-session")
const passUserToView = require('./middleware/passUserToView')
const isSignedIn = require("./middleware/isSignedIn")
const comboRoutes = require("./routes/combo.routes")


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false })); 
app.use(methodOverride("_method")); 
app.use(morgan("dev")) 
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView) 
app.set("view engine", "ejs") 



conntectToDB()




app.use("/auth",authRoutes)
app.use(isSignedIn) 
app.use('/combos', comboRoutes)


















const port = process.env.PORT || 3000


app.listen(port,()=>{
    console.log("Listening on port " + port)
}) 










