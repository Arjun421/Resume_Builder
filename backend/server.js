require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDB=require("./config/db")
const app = express()
const authRoutes = require("./routes/authRoutes")
const resumeRoutes = require("./routes/resumeRoutes")
console.log("🚀 Starting server...");
console.log("Environment variables loaded:");
console.log("- PORT:", process.env.PORT);
console.log("- MONGO_URI:", process.env.MONGO_URI ? "✅ Set" : "❌ Not set");

//middleware to handle cors
app.use(
  cors({
    origin:process.env.CLIENT_URL || "*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
  })
);

//connect Database
console.log("📡 Connecting to database...");
connectDB()

//middleware
app.use(express.json())

//Routes
app.use("/api/auth",authRoutes)
// app.use("/api/resume",resumeRoutes)
//server uploads folder 
app.use(
  "/uploads",
  express.static(path.join(__dirname,"uploads"),{
    setHeaders:(res,path)=>{
      res.set("Access-Control-Allow-Origin","http://localhost:5173")
    }
  })

)
const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`🎉 Server running on port ${PORT}`)
  console.log(`🌐 Server URL: http://localhost:${PORT}`)
})
