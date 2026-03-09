const mongoose = require("mongoose");
const Role = ["Staff", "User", "Admin"]
const DefaultRole = Role[0]; // Staff

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        passwordHash: { 
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: Role,
            required: true,
            default: DefaultRole
        }
    
    },
    {timestamps: true}
);