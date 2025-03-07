import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController";
import { protect } from "../middlewares/authMiddleware"; // ✅ Import protect middleware

const router = express.Router();

router.post("/tasks", protect, createTask);  // ✅ Protect route
router.get("/tasks", protect, getTasks);
router.put("/tasks/:id", protect, updateTask);
router.delete("/tasks/:id", protect, deleteTask);

export default router;
