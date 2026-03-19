const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model("Book", bookSchema);