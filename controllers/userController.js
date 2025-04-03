import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const signup = async (req,res)=>{
    try{

        const {email,password,name} = req.body

        if(!email || !password || !name){
            return res.json({
                success : false , error : true , message : 'Please enter credentails'
            })
        }

        const checkUser = await User.findOne({email})

        if(checkUser){
            return res.json({
                success : false , error : true , message : 'User already exists'
            })
        }else{

             const hash = await bcrypt.hash(password,10)

             const newUser = new User({
                name,email,password : hash
             })

             const saveUser = await newUser.save()

             res.json({
                success : true , error : false , message : 'User Account Created'
             })

        }

    }catch(error){
        console.error(error);
        return res.json({
            success : false , error : true , message : error.message
        })
        

    }
}

const login = async (req,res) =>{
    try{

        const{email,password} = req.body
        
        const checkUser = await User.findOne({email})
        if(!checkUser){
            res.json({
                success : false , error : true , message : 'User does not exists'
            })
        }

        const matchUser = await bcrypt.compare(password,checkUser.password)

        if(!matchUser){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token =  jwt.sign({id : checkUser._id },process.env.JWT_SECRET_KEY,{expiresIn : '1d'})

        res.status(200).json({ success: true, message: 'Login successfull',token,user: { email: checkUser.email, name: checkUser.name }})





    }catch(error){

        console.error(error)

        res,json({success : false , error : true , message : error.message})



    }
}

export {signup,login}