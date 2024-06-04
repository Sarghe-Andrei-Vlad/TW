document.addEventListener("DOMContentLoaded", function () {
    let address = "http://localhost";
    let logoutLink = document.getElementById('logout-link');

    if (logoutLink) {
        logoutLink.addEventListener('click', function (event) {
            event.preventDefault();

            const token = localStorage.getItem('jwt');
            if (token) {
                let url = address + ':8001/logout';
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token })
                })
                    .then((resp) => {
                        if (resp.status === 200) {
                            localStorage.removeItem('jwt');
                            alert('Logout successful!');
                            window.location.href = 'index.html';
                        } else {
                            alert('Logout failed. Please try again.');
                        }
                    })
                    .catch((err) => {
                        console.error('Error during logout:', err);
                        alert('An error occurred during logout. Please try again later.');
                    });
            } else {
                alert('No token found. Please log in first.');
            }
        });
    }
});