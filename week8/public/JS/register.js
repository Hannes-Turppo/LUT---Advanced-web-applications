const { Router } = require("express");

const sendRegistration = async (event) => {
    event.preventDefault();
    const registerForm = document.getElementById('registerForm');

    try {
        // send values to backned
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: event.target.email.value,
                password: event.target.password.value,
            }),
        });

        // if status is 200, registration is successful. Else, display error message
        if (response.status === 200) {
            console.log('Registration successful');
            // window.location.href = '/login';
            return;
        } else {
            message = await response.json();
            console.error(`Error ${response.status}: ${message.message}`);

            errorField = document.getElementById("errorField");
            errorField.innerHTML = `Error: ${message.message}`;
            return;
        }

    } catch (error) {
        console.error(`Error sending registration: ${error}`);
        return;
    }
}



const registerForm = document.getElementById('registerForm').addEventListener('submit', (event) => sendRegistration(event));
