const registerForm = document.getElementById("loginForm")
.addEventListener(
    "submit",
    (event) => {
        loginUser(event);
    });
    
    
const loginUser = async (event) => {
    event.preventDefault();
        
    const formData = {
        email: event.target.email.value,
        password: event.target.password.value
    };

    try {
        const response = await fetch(
            "api/user/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        )
        if (!response.ok) {
            console.error(`Error while trying to log in: ${error}`);
        } else {
            // get token from backend and store it in local storage
            const data = await response.json();
            console.log(data.token);

            localStorage.setItem("token", data.token);

            console.log("User logged in successfully");
            window.location.href = "/";
        }

    } catch (error) {
        console.error(`Error while trying to log in: ${error}`);
    }

    
}
