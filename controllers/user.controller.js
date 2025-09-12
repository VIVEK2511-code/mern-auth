import User from "../models/User.model.js";
import crypto from "crypto"
export const registerUser=async(req,res)=>{
    //get data
    //validate data
    //check if user already exists
    //create a user in database
    //create a verififcation token
    //save torkn in database
    //save token in database
    //send token as email to user
    //send success sattuts to user
   
    const {name,email,password}=req.body;
    if (!name || !email || !password) {

      return res.status(400).json({ message: "All fields are required" });
    }

    try{
      const existingUseruser=  await User.findOne({email})
      if(existingUseruser){
        return res.status(400).json({message:"User already exists"})
      }
    

  const user=await User.create({
        name,
        email,
        password
      })
      console.log(user);
    if(!user){
        return res.status(400).json({message:"User not registered"})
    } 


   const token= crypto.randomBytes(32).toString("hex")
   console.log(token);

    user.verificationToken=token;
    await user.save();
    


    }catch(err){

    }
    





  
}
