import { Request } from "express";
import { UserDocument } from "../models/User"; // Adjust the path if needed

declare module "express-serve-static-core" {
  interface Request {
    user?: UserDocument; // Add user to Request
  }
}
