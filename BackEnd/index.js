import express from "express";
import dotenv from "dotenv";
import trafficRoutes from "./routes/allapisroute.js"; // Import your new router
import authRoutes from "./routes/authRoutes.js"; // ✅ NEW
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();

const app = express();
try {
  await mongoose.connect(
    "mongodb+srv://za5232208:za5232208@infaticacluster.fkvvdx1.mongodb.net/?retryWrites=true&w=majority&appName=InfaticaCluster"
  );
  console.log("Database Connection Successfully!!");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
  process.exit(1); // Exit the process if unable to connect to MongoDB
}
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
const corsOptions = {
  origin: [
    "https://infatica-dashboard-frontend.vercel.app",
    "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Add this line

// Routes
app.get("/", (req, res) => {
  res.send("Server Work Successfully or Run");
});

// Mount traffic routes
app.use("/api/stats", trafficRoutes);
app.use("/api/auth", authRoutes); // ✅ Add Auth routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
