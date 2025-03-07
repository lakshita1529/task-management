import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";  // Import task routes
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Define Routes
app.use("/auth", authRoutes);
app.use("/api/tasks", taskRoutes); // Mount task routes correctly

app.post("/api/tasks", async (req, res) => {
    const { title, description, completed, userId } = req.body;

    console.log("Received Task Data:", req.body); // Debug log

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const task = await prisma.task.create({
            data: {
                title,
                description,
                completed: completed || false,
                userId, // Ensure userId exists in DB
            },
        });

        console.log("Saved Task:", task);
        res.json(task); // Send the saved task back in the response
    } catch (error) {
        console.error("Error saving task:", error);
        res.status(500).json({ error: "Failed to create task" });
    }
});


app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await prisma.task.findMany(); // Fetch tasks correctly
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});


  

app.listen(5000, () => console.log("Server running on port 5000"));
