const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, trim: true},
        body: {type: String, required: false, trim: true},
        createdAt:{type: Date, default: Date.now}
    }
); 

const note = mongoose.model("note", noteSchema);

module.exports = {note}