const registerForm = document.getElementById("registerForm")
.addEventListener(
    "submit",
    (event) => {
        registerUser(event);
    });
    
    
const registerUser = async (event) => {
    event.preventDefault();
        
    const formData = {
        email: event.target.email.value,
        password: event.target.password.value
    };

    try {
        const response = await fetch(
            "api/user/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        )
        if (response.status === 403) {
            console.error("User already exists");
        } else if (!response.ok) {
            console.error(`Error while trying to register: ${error}`);
        } else {
            const data = await response.json();
            console.log(data);
            console.log("User registered successfully");
            window.location.href = "/login.html";
        }

    } catch (error) {
        console.error(`Error while trying to register: ${error}`);
    }

    
}
