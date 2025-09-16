import mongoose from "mongoose";
import validator from 'validator'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    maxLength: [
      25,
      "Invalid name. Please enter a name with fewer than 25 characters",
    ],
    minLength: [3, "Name should contain more  than 3 charters"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
    maxLength: [
      25,
      "Invalid name. Please enter a name with fewer than 25 characters",
    ],
    minLength: [3, "Name should contain more  than 3 charters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false // it is use for  not show password
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default : false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  verificationToken:String,
  verificationTokenExpiresAt:Date

} , {timestamps: true});

export default mongoose.model("User" , userSchema)

