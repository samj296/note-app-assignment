const mongoose = require("mongoose");
const Role = ["Staff", "User", "Admin"]
const DefaultRole = Role[1]; // User

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

module.exports = mongoose.model("User", userSchema)