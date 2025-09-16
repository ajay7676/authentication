import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const  register = async(req, res) => {
   const {firstName,lastName, email , password} =  req.body;
     
   try {
     if(!firstName || !lastName || !email || !password){
        throw new Error("All Fileds are reqired")

     }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10); 
    // 10 = salt rounds (security level)

      // Genrate the verifaction code after register user (6digit)
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

      const user = await User.create({
        firstName,
        lastName,
        email ,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 2*60*60*1000

      });
      res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: user
      })
   } catch (error) {
     console.log(error)
     res.status(400).json({
        success:false,
        message: error.message
     })
   }
};