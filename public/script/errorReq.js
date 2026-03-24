function ensureLoggedIn(res){
        const contentType = res.headers.get("content-type");
        const isNotJson = !contentType || !contentType.includes("application/json")
        // 401 “Unauthorized”
        const isUnauthorized = res.status === 401;
    
    if(isNotJson || isUnauthorized){
        window.location.href = "/users/login";
        return true;
    };

    return false;
};

export {ensureLoggedIn};