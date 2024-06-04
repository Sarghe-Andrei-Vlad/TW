function getUrlParameter(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        document.addEventListener('DOMContentLoaded', () => {
            const shoePhoto = document.getElementById('shoe-photo');
            const shoeDescription = document.getElementById('shoe-description');

            const imageUrl = getUrlParameter('image_url');
            const description = getUrlParameter('description');

            if (imageUrl) {
                shoePhoto.src = decodeURIComponent(imageUrl);
            }
            if (description) {
                shoeDescription.innerHTML = decodeURIComponent(description).replace(/\n/g, '<br>');
            }
        });