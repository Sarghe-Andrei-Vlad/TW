document.addEventListener("DOMContentLoaded", function () {
    let address = "http://localhost";
    let reviewForm = document.getElementById('review-form');
    let FootwearID = getUrlParameter('footwearID');
    let recommendation_description = document.getElementById('shoe-description').innerText;

    reviewForm.addEventListener('submit', function (event) {
       
        event.preventDefault();

        let formData = new FormData(reviewForm);
        let review = formData.get('review');
        let rating = formData.get('rating');

        if (!review || !rating) {
            alert('Please fill in all fields.');
            return;
        }

        let requestData = {
            FootwearID: FootwearID,
            recommendation_description: recommendation_description,
            review : review,
            rating : rating
        };

        console.log(requestData);

        let url = address + ':8001/review';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((resp) => {
                if (resp.status === 200) {
                    alert('Review registered successful!y');
                    location.href = 'filter.html';
                } else {
                    alert('Review registration failed. Please try again later.');
                }
            })
            .catch((err) => {
                console.error('Error during review registration:', err);
                alert(`${err}`);
            });
    });
});
