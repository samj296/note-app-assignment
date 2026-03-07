exports.getAllStaffs = (req, res) => {
    res.json({
        message: `retreving all the staffs`
    });
};

exports.getStaffById = (req, res) => {
    res.json({
        message: `retreiving staff by id- ${req.params.id}`
    });
};

exports.upateStaff = (req, res) => {
    res.status(200).json({
        message: `updating the staff id- ${req.params.id}`
    });
};

exports.createStaff = (req, res) => {
    res.status(201).json({
        message: `staff created`,
        staff: req.body
    });
};

exports.deleteStaff = (req, res) => {
    res.status(200).json({
        message: `staff deleted id- ${req.params.id}`
    });
};