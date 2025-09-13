import User from "../models/User.model.js";
import crypto from "crypto"
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookie from "cookie-parser"
dotenv.config();
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

    //send email to user
  const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,   // 👈 from .env
  port: process.env.MAIL_PORT,   // 👈 from .env
  auth: {
    user: process.env.MAIL_USER, // 👈 from .env
    pass: process.env.MAIL_PASS, // 👈 from .env
  },
});

const mailOptions = {
  from: "process.env.MAILTRAP_SENDEREMAIL",  // sender address
  to: "use.email",                 // recipient address
  subject: "Verify your email",           // subject line
  text: `please click on the following link:${process.env.BASE_URL}/api/v1/users/verify/${token}`,   // plain text body
  
};
await transporter.sendMail(mailOptions);

res.status(200).json({
  message:"User registered successfully please check your email to verify your email address",
  success:true
})

    }catch(err){

      res.status(400).json({
        message:"Something went wrong",
        success:false,
        error:err.message
      })


    }
    





  
}


export const verifyUser=async(req,res)=>{

  //got toekn from url
  //validate
  //find user based on token
  //if not
  //set isverified to true
  //remove verification token

  const {token}=req.params;
  console.log(token);
  if(!token){
    return res.status(400).json({
      message:"Token is missing"
    })
  }

  const user=await User.findOne({verificationToken:token})
    if(!user){
      return res.status(400).json({
        message:"Invalid token"
      })
    }

    user.isVerified=true;
    user.verificationToken=undefined;
    await user.save();
   
}


export const login=async (req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
    return res.status(400).json({
      message:"All fields are required"
    })
  }

  try{
    const user=await User.findOne({email})
    if(!user){
      return res.status(400).json({
        message:"User does not exist or password is incorrect"
      })
    }
    const isMatch=await bcrypt.compare(password,user.password)
    console.log(isMatch);
    if(!isMatch){
      return res.status(400).json({
        message:"ivalid email or password"
      })
    }

    jwt.sign({id:user._id,role:user.role},
      process.env.JWT_SECRET,
      {expiresIn:'24h'}
    );

    const cookieOptions={
      httpOnly:true,
      secure:true,
      maxAge:24*60*60*1000,
    }
   
    res.cookie("token",token,cookieOptions)
    

    res.status(200).json({
      success:true,
      message:"User logged in successfully",
      user:{
        name:user.name,
        email:user.email,
        role:user.role
      }
    })
  }catch(err){

  }
}





export const getMe=async(req,res)=>{
  try{

  }catch(error){

  }
}


export const logoutUser=async(req,res)=>{

}




