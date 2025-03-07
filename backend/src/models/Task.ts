import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./User";

// Define attributes for Task model
interface TaskAttributes {
    id: number;
    title: string;
    description: string;
    userId: number;
}

// Make id optional for Sequelize auto-increment
interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}

// Extend Sequelize Model with types
class Task extends Model<TaskAttributes, TaskCreationAttributes> {
    public id!: number;
    public title!: string;
    public description!: string;
    public userId!: number;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "Task",
        timestamps: true,
    }
);

// Define Relationships
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

export default Task;
