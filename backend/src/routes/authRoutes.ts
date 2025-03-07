// routes/authRoutes.ts
import express from "express";
import { registerUser , loginUser  } from "../controllers/authController"; // Adjust the path if needed

const router = express.Router();

router.post("/register", registerUser );
router.post("/login", loginUser );

export default router;