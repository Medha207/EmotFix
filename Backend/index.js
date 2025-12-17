
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/MovieRoutes.js";
import route from "./routes/userRoutes.js";
import reviewrouter from "./routes/reviewRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://emot-fix.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: "GET,PUT,POST,DELETE"
}));

app.use(express.json());
app.use('/api/movies', router);
app.use('/api/users', route);
app.use("/api/reviews", reviewrouter);
console.log("✅ Routes mounted at /api/movies");

const mongo_URI = process.env.MongoDb_URI
const port = process.env.PORT

mongoose.connect(mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tlsAllowInvalidCertificates: true
})
    .then(()=>{
        console.log("MongoDb Connected Successfully")
        app.listen(port,()=>{
            console.log("Server Started")
        })
    })
    .catch((e)=>{
        console.error("MongoDB connection Failed!",e)
    })
