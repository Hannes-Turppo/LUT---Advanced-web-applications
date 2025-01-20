
const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        response = await fetch("api/private", {
            method: "get",
            headers: {
                "authorization": `Bearer ${token}`}})

        if (response.status === 200) {
            console.log("User is logged in");
            const message = document.getElementById("secretMessage");
            message.innerHTML = "This is protected secure route!";
            
            
            // init logout button
            const logoutButton = document.getElementById("logout")
            logoutButton.style.display = "block";
            logoutButton.addEventListener("click", () => {
                localStorage.removeItem("token");
                window.location.href = "/login.html";
            });
        }
    } else {
        window.location.href = "/login.html";
    };
};
validateToken();
