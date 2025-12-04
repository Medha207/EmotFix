// import { userModel } from "../models/userModel.js"
// import {hash, compare} from "bcrypt"
// import jsonwebtoken from "jsonwebtoken";
// const jwt = jsonwebtoken

// export async function createUser(req, res){
//     try{
//       console.log(req.body)
//         const {username, email, password} = req.body
    
//         const hashedPassword = await hash(password,10)   //Hashing with 10 salts
//         // Here you would typically save the user to a database
//         // For now, we will just return the hashed password
//         const userDetails = await userModel.findOne({username})  
//         if(userDetails !=  null){
//             return res.status(400).json({error:"User already exists"})
//         }
//         const user = await userModel.create({username, email, password:hashedPassword})
//         res.status(200).json({user})
        
//     }catch(e){
    
//         console.error(e)
//         res.status(500).json({error:"Something went wrong"})
        
//     }

    
// }

// export async function loginUser(req, res){
//     try{
//         const {username, email, password} = req.body

//         const userDetails = await userModel.findOne({username})
//         console.log(userDetails)  
//         if(userDetails != null){
//           console.log(userDetails)
//             const isPasswordValid = await compare(password, userDetails.password)
//             if (!isPasswordValid){
//                 return res.status(400).json({error:"Invalid Password"})
//              }  const payload = {
//                     id: userDetails._id, username: userDetails.username }
//                 const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
            
//                 res.status(200).json({jwtToken , user: { id: userDetails._id, username: userDetails.username, email: userDetails.email } });
            
//         }else{
//             return res.status(400).json({error:"Please register first"})
//         }

//     }catch(e){
//         console.error(e)
//         res.status(500).json({error:"Something went wrong"})
//     }
// }




import { userModel } from "../models/userModel.js";
import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

// Signup / Register
export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    console.log("📩 Register request:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("✅ User registered:", newUser.username);
    return res.status(201).json({ message: "Registered successfully", user: newUser });
  } catch (err) {
    console.error("❌ Registration Error:", err.message);
    return res.status(500).json({ error: "Something went wrong", details: err.message });
  }
}

// Login
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    console.log("📩 Login request:", req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found. Please register first." });
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log("✅ Login success:", user.username);
    return res.status(200).json({
      message: "Login successful",
      jwtToken: token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    return res.status(500).json({ error: "Something went wrong", details: err.message });
  }
}