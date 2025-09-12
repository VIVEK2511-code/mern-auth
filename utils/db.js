import mongoose from "mongoose";


import dotenv from "dotenv"
dotenv.config();

   const db=()=>{
     mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to mongodb");
    })
    .catch((err)=>{
        console.log("Error connecteing to mongodb")
    })
    
   }


export default db;