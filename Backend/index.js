
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
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:3000",
  "https://emot-fix.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in the allowed list or is a Vercel subdomain
    const isAllowed = allowedOrigins.includes(origin) || 
                     origin.endsWith(".vercel.app") || 
                     origin.startsWith("http://localhost:");
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.error(`CORS blocked for origin: ${origin}`);
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: "GET,PUT,POST,DELETE"
}));

app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use('/api/movies', router);
app.use('/api/users', route);
app.use("/api/reviews", reviewrouter);
console.log(" Routes mounted at /api/movies");

const mongo_URI = process.env.MongoDb_URI
const port = process.env.PORT

mongoose.connect(mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tlsAllowInvalidCertificates: true
})
  .then(() => {
    console.log("MongoDb Connected Successfully")
    app.listen(port, () => {
      console.log("Server Started")
    })
  })
  .catch((e) => {
    console.error("MongoDB connection Failed!", e)
  })
