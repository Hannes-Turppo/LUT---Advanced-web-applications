// document that includes frontend functionality for week6 exercises


// function to handle upload of offer items to backend
const offerForm = document.getElementById("offerForm");
offerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);



    console.log(formData);

    // post info
    try {
        const response = await fetch("/upload", {
            method: 'post',
            body: formData
        })
        console.log(response);

    } catch (error) {
        console.error(error);
    }
});

