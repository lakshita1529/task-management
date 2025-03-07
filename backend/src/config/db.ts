
// const mongoose = require("mongoose");
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  logging: false, // Disable logging (optional)
});

export default sequelize;