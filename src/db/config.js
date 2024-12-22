const mongoose = require("mongoose");
require("dotenv").config()



let {DB_USER_NAME,DB_PASSWORD,CLUSTER_NAME,DB_NAME}=process.env


mongoose.connect(`mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@${CLUSTER_NAME}.lbogd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${CLUSTER_NAME}`)
.then(() => console.log('Db Connected!'))
  .catch((error)=>{console.log(error)})