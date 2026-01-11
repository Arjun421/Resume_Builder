const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" }) // Fixed: expiresIn
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body; // Added profileImageUrl
    
    const userExists = await User.findOne({ email }); // Mongoose method
    
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // Use the salt
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl: profileImageUrl || null,
    });
    
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl || null,
      token: generateToken(user._id)
    })

  } catch (err) {
    console.error("Registration error:", err); // Added for debugging
    return res.status(500).json({ message: "Server error", error: err.message })
  }
}

const loginUser = async (req, res) => {
  const {email, password} = req.body;
const user = await User.findOne({email});

if (!user) {
    return res.status(400).json({message: "Invalid email or password"});
}
const isMatch = await bcrypt.compare(password,user.password)
if(!isMatch){
  return res.status(400).json({message: "Invalid email or password"})
}
return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl || null,
      token: generateToken(user._id)
    })


}
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    res.json(user)

    
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: err.message })
    
  }
}

module.exports = { registerUser, loginUser, getUserProfile }