import { baseURL, navbarFunction, tostTopEnd } from "../global/utils.js";

let currentUser = JSON.parse(localStorage.getItem("logged_in_user")) || null;
document.addEventListener("DOMContentLoaded", function () {
  if (currentUser) {
    showUserDetails(currentUser); // Show user details if logged in
  } else {
    showLoginForm(); // Show login form if not logged in
  }
});

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("usermail").value;
  const password = document.getElementById("password").value;

  const obj = {
    email,
    password,
  };

  try {
    let response = await fetch(`${baseURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let data = await response.json();
    if (!response.ok) throw new Error(data.message);
    

      delete data.user.password;
      currentUser = data.user;
      showUserDetails(currentUser);
      localStorage.setItem("token", data.token);
      localStorage.setItem("logged_in_user", JSON.stringify(currentUser));
        setTimeout(()=>{window.location.href = "/";},2000);
        
    
  } catch (error) {
    tostTopEnd.fire({
      title: error.message,
      icon: "error",
    });
    console.log({ error: error.message });
  }
});

function showUserDetails(user) {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("user-details").style.display = "block";

  document.getElementById("user-name").textContent = user.name;
  document.getElementById("user-email").textContent = user.email;
  document.getElementById("user-age").textContent = user.age;
}

function showLoginForm() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("user-details").style.display = "none";
}
navbarFunction()