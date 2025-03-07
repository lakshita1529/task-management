import sequelize from "../config/db";
import User from "./User";
import Task from "./Task";

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Ensures tables are up to date
        console.log("Database synced successfully!");
    } catch (error) {
        console.error("Database sync error:", error);
    }
};

syncDatabase();

export { User, Task };
