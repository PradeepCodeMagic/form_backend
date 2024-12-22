 const express = require('express')
const { registerUser, getUser, upload, deleteUser, allUserDelete, seletedDelete, updateUser, getSingleUser, searchUserByName } = require('../../controllers/mainController')

 const useRoutes=express.Router()

 useRoutes.post("/register",upload.single("profilePicture") ,registerUser)
 useRoutes.get("/getuser",getUser)
 useRoutes.delete("/single-user-delete/:id",deleteUser) 
 useRoutes.delete("/multi-user-delete",allUserDelete)
 useRoutes.post("/seleted-user-delete",seletedDelete)
 useRoutes.put("/update-user/:id",updateUser) 
 useRoutes.get("/single-user/:id",getSingleUser) 
 useRoutes.get("/search-user/name/:username",searchUserByName)

 module.exports={useRoutes}