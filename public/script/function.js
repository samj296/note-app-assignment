// This file is for login and signup page only
import {overlay} from "./infoFunction.js";

overlay()

const signUpbtn = document.getElementById("signup-btn");
if(signUpbtn){
    signUpbtn.addEventListener("click", renderSignUp);
}

function renderSignUp(){
    window.location.href = "/users/signup";
};


const loginBtn = document.getElementById("login-btn")
if(loginBtn){
    loginBtn.addEventListener("click", renderLogin);
}


function renderLogin(){
    window.location.href = "/users/login";
}