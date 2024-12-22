const express=require("express");
const allRoutes = require("./src/app");
const app=express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const path=require("path")
require("dotenv").config();
require("./src/db/config")

app.use("/uploads",express.static(path.join(__dirname,'uploads')))

// console.log("express",express.static(path.join(__dirname,'uploads')))
app.use("/api",allRoutes)
app.listen(process.env.PORT,()=>{
    console.log(`run on ${process.env.PORT}`)
});


// http://localhost:5500/api/website/user/getuser             //get
// http://localhost:5500/api/website/user/register            //post
// http://localhost:5500/api/website/user/single-user-delete/:id  //delete 
// http://localhost:5500/api/website/user/multi-user-delete   //delete 
// http://localhost:5500/api/website/user/seleted-user-delete //post

// update work
// http://localhost:5500/api/website/user/update-user/:id     //put
//  http://localhost:5500/api/website/user/single-user/:id  //get

// http://localhost:5500/api/website/search-user/name/:username //get 