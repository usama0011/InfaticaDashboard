import express from "express";
import dotenv from "dotenv";
import trafficRoutes from "./routes/allapisroute.js"; // Import your new router
import cors from "cors";
dotenv.config();

const app = express();

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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
