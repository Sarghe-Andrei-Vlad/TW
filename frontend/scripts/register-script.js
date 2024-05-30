document.addEventListener("DOMContentLoaded", function () {
    let address = "http://localhost";
    let registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', function (event) {
       
        let formData = new FormData(registerForm);
        let username = formData.get('username');
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeat-password');

        if (!username || !email || !password || !repeatPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== repeatPassword) {
            alert('Passwords do not match.');
            return;
        }

        let requestData = {
            username: username,
            email: email,
            password: password
        };

        let url = address + ':8001/register';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((resp) => {
                if (resp.status === 200) {
                    alert('Registration successful!');
                    location.href = 'login.html';
                } else {
                    alert('Registration failed. Please try again later.');
                }
            })
            .catch((err) => {
                console.error('Error during registration:', err);
                alert(`${err}`);
            });
    });
});
