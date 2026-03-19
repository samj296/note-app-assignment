
module.exports = function ensureLoggedIn(req, res, next){
    if(typeof req.isAuthenticated === "function" && req.isAuthenticated()){
        return next();
    }


    return res.redirect("/users/login");
};