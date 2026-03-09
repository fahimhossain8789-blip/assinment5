

document.getElementById("login-btn").addEventListener("click", function() {

    const usernameInput = document.getElementById("input-username");
    
    const username = usernameInput.value; 
    console.log("Username:", username);

    const inputPassword = document.getElementById("input-password");
  
    const inputPass = inputPassword.value; 
    console.log("Password:", inputPass);

    
    if (username === "admin" && inputPass === "admin123") {

        alert("Login Success");
        window.location.assign("/home.html");
    } else {
        alert("Login Failed");
    }
});