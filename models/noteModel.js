const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, trim: true},
        noteBody: {type: String, required: false, trim: true},
        createdAt:{type: Date, default: Date.now}
    }
); 

const Note = mongoose.model("Note", noteSchema);

module.exports = {Note}