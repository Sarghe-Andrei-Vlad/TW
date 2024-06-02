document.addEventListener("DOMContentLoaded", function () {
    let address = "http://localhost";
    let loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let formData = new FormData(loginForm);
        let username = formData.get('username');
        let password = formData.get('password');

        console.log('Username:', username);
        console.log('Password:', password);

        if (!username || !password) {
            alert('Please fill in all fields.');
            return;
        }

        let requestData = {
            username: username,
            password: password
        };

        console.log('Request Data:', requestData);

        let url = address + ':8002/login';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((resp) => {
            if (resp.status === 200) {
                return resp.json();
            } else if (resp.status === 401) {
                alert('Login failed. Please check your username and password.');
                throw new Error('Login failed: Unauthorized');
            } else {
                alert('An error occurred. Please try again later.');
                throw new Error('Error: ' + resp.statusText);
            }
        })
        .then((jsonResp) => {
            localStorage.setItem("jwt", jsonResp.token);
            console.log('JWT Token:', localStorage.getItem("jwt"));
            window.location.href = './filter.html';
        })
        .catch((err) => {
            console.error('Error during login:', err);
            alert('An error occurred during login. Please try again later.');
        });
    });
});
