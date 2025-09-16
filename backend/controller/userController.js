import User from "../model/User.js";

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
      // Genrate the verifaction code after register user (6digit)
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

      const user = await User.create({
        firstName,
        lastName,
        email ,
        password,
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