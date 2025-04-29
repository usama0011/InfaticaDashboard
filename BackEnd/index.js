import express from "express";
import dotenv from "dotenv";
import trafficRoutes from "./routes/allapisroute.js"; // Import your new router

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

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
