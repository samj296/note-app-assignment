
module.exports = function ensureLoggedIn(req, res, next){
    if(typeof req.isAuthenticated === "function" && req.isAuthenticated()){
        return next();
    }
    // Checking if the request is coming from Ajax then, return JSON instead of redirect
    if (req.header.accept && req.header.accept.includes("application/json")){
        return res.status(401).json({error: "Session expired"});
    };

    // This is for normal browser navigation
    return res.redirect("/users/login");
};