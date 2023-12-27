document.addEventListener("DOMContentLoaded", function() {
    const userDataForm = document.getElementById("userDataForm");
    
    userDataForm.addEventListener("submit", function(event) {
        event.preventDefault();
        validateForm();
    });
});

function validateForm() {
    const emailInput = document.getElementById("email");
    const userDataContainer = document.getElementById("userData");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value)) {
        alert("Please enter a valid email address.");
        return;
    }


    fetchUserData(emailInput.value);
}

function fetchUserData(email) {
    const userDataContainer = document.getElementById("userData");

    fetch(`https://reqres.in/api/users?email=${email}`)
        .then(response => response.json())
        .then(data => {
           
            if (data.data.length > 0) {
                const user = data.data[0];

                const userDiv = document.createElement("div");
                userDiv.classList.add("user-card");

                const userImage = document.createElement("img");
                userImage.src = user.avatar;
                userImage.alt = "User Avatar";

                const userEmail = document.createElement("p");
                userEmail.textContent = user.email;

                userDiv.appendChild(userImage);
                userDiv.appendChild(userEmail);

                userDataContainer.innerHTML = ""; 
                userDataContainer.appendChild(userDiv);
            } else {
                alert("No user found with the provided email.");
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
}