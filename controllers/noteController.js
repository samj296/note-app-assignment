exports.getAllNotes = (req, res) => {
    res.json({message: "retreving all notes"});
};

exports.getNoteById = (req, res) => {
    res.status(200).json({
        message: `retreving note by id ${req.params.id}`
    });
};

exports.updateNote = (req, res) => {
    res.json({
        message: `note updated for the id ${req.params.id}`,
        note: req.body
    });
};

exports.createNote = (req, res) => {
    res.status(201).json({
        message: "created note",
        note: req.body
    });
};

exports.deleteNote = (req, res) => {
    res.status(200).json({
        message: `note deleted id- ${req.params.id}`
    });
};