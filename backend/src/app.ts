import express from "express";
import cors from "cors";

const app = express();

// ✅ Configure CORS properly
app.use(cors({
  origin: "http://localhost:3000",  // Allow frontend origin
  credentials: true,  // Allow cookies & auth headers
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());  // Parse JSON

app.get("/", (req, res) => {
  res.send("Server is running...");
});

export default app;
