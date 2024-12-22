const express=require("express")
const { useRoutes } = require("./routes/mainRoutes")


const allRoutes=express.Router()
const websiteRoute=express.Router()


websiteRoute.use("/user",useRoutes)

allRoutes.use("/website",websiteRoute)

module.exports=allRoutes