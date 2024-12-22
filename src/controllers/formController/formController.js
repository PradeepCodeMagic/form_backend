const { registerModal } = require("../../modals/mainModal")
const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req , file , next)=>{
        next(null,"uploads")
    },
    filename:(req,file,next)=>{
        
        next(null, Date.now() + "-" + file.originalname)
    }
})

const upload=multer({storage});

const registerUser = async (req, res) => {
    
    try {
        
        let DataRegister = new registerModal({
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            profilePicture: req.file.filename,
            address: req.body.address,
            dob: req.body.dob,
            qualification: req.body.qualification,
            contact:req.body.contact

        })
        const saveData = await DataRegister.save()
        res.status(200).json({
            "message": "User registered successfully!",
            data: saveData
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message,
        });
    }
}

const getUser=async(req,res)=>{
    try {
        
        const getUser=await registerModal.find()
        
        res.status(200).json({
            "message": "Data successfully fetch!",
            data: getUser
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Not Found !!",
            error: error.message,
        });
    }
}

const deleteUser=async(req,res)=>{
   
    try{
        const Uid=req.params.id

        const DeleteU=await registerModal.findOneAndDelete(Uid)

        if(!DeleteU){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            
            message: "User deleted successfully",
            data: DeleteU,
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Not Delete",
            error: error.message,
        });
    }
}

const allUserDelete=async(req,res)=>{
    
    try{
        const DeleteAll=await registerModal.deleteMany({})

       
        if(DeleteAll.deletedCount==0){
            return res.status(404).json({
                message: "No users found to delete",
            });
        }
        res.status(200).json({     
            message: "All users deleted successfully",
            data: DeleteAll,
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Not Delete",
            error: error.message,
        });
    }
}

const seletedDelete=async(req,res)=>{
    
    try{
        const seletedUserArray=req.body;

        if(seletedUserArray.length==0 || !seletedUserArray){
            return res.status(404).json({
                message: " no users selected Or invalid User input format",
            });
        }

        const seletedUserDelete=await registerModal.deleteMany({_id: {$in:seletedUserArray} })

        if (seletedUserDelete.deletedCount === 0) {
            return res.status(404).json({
                
                message: "No users found to delete",
            });
        }
        
        res.status(200).json({     
            message: "Seleted users deleted successfully",
            data: seletedUserDelete,
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Error deleting selected users",
            error: error.message,
        });
    }
}

const getSingleUser=async(req,res)=>{
    try{
        const sId=req.params.id;
        const fUser=await registerModal.findOne({_id:sId})
        if (!fUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: fUser,
        });
        
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Error in update users",
            error: error.message,
        });
    }
}

const updateUser=async(req,res)=>{
    try{
        const updateObj=await registerModal.updateOne(
            {_id: req.params.id},
            {$set:req.body}
            );

       
        if(!updateObj) res.status(404).json({message:"please send a valid id"});
        res.status(200).json({message: 'success'});
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Error in update users",
            error: error.message,
        });
    }
}

const searchUserByName=async(req,res)=>{
    try{
        const sUser=req.params

        const response = await registerModal.find({name: new RegExp(req.params)});
        
        res.status(200).json({message:'success', data: response});
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "No user Found",
            error: error.message,
        });
    }
}

module.exports = {registerUser,getUser,upload,deleteUser,allUserDelete,seletedDelete,updateUser,getSingleUser,searchUserByName}