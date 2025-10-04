import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import genToken from "../utils/token.js"

export const signUp = async (req,res) => {
    try{
        const {fullName,email,password,mobile,role} = req.body
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "user already exist"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be at least 6 charactor" })
        }
        if(mobile.length<10){
             return res.status(400).json({message:"mobile number must be at least 10 digits" })
        }

        const hashedPassword = await bcrypt.hash(password,10)
         user = await User.create({
            fullName,
            email,
            role,
            mobile,
            password:hashedPassword
         })

        
        const token = await genToken(user._id)

        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })


          return res.status(201).json(user , {
            message: "Account created successfully.",
            success: true
        })

        

    }catch(error){
        return res.status(500).json(`sign up error ${error}`)

    }
}

export const signIn = async (req,res) => {
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user does not exist"})
        }
        const isMatch = bcrypt.compare(password , user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect password"})
        }

        const token = await genToken(user._id)

        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true

        })

        return res.status(200).json(user)

    }catch(error){
        return res.status(500).json(`sign In error ${error}`)

    }
}

export const signOut  = async (req,res) => {
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"log out successfully"})

    }catch(error){
        return res.status(500).json(`sign out error ${error}`)

    }
}
