document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('shoe-gallery');
    const paginationControls = document.getElementById('pagination-controls');
    const shoesPerPage = 4;
    let allImages = [];

    const fetchImages = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8001/images`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            allImages = await response.json();
            console.log(allImages);
            if (Array.isArray(allImages)) {
                //allImages.filter....
                const totalPages = Math.ceil(allImages.length / shoesPerPage);
                updatePaginationControls(1, totalPages);
                displayImages(1, allImages);
            } else {
                console.error('Invalid response structure:', allImages);
            }
        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
    };

    const displayImages = (page, images) => {
        galleryContainer.innerHTML = '';
        const start = (page - 1) * shoesPerPage;
        const end = start + shoesPerPage;
        const currentShoes = images.slice(start, end);

        let columnContent = '';

        currentShoes.forEach((image, index) => {
            if (index % 2 === 0) columnContent += '<div class="column">';
            columnContent += `<div class="photo">
            <a href="shoe-page.html?image_url=${encodeURIComponent(image.image_url)}&description=${encodeURIComponent(`These ${image.type || `kicks`} are the perfect ${image.sex || ``} ${image.age || ``} shoes. \n With their ${image.color || `color`} nouances and a nice ${image.personal_style || `style and`} ${image.pattern || ``} pattern, \n they can be worn any ${image.weather || ``} day of ${image.season || `this season`}. \n Please leave our recommandation a review below. \n Thank you!!!`)}&footwearID=${encodeURIComponent(image.FootwearID)}">
              <img src="${image.image_url}" alt="">
            </a>
          </div>`;
                      if (index % 2 === 1 || index === currentShoes.length - 1) columnContent += '</div>';
        });

        galleryContainer.innerHTML = columnContent;
    };

    const updatePaginationControls = (currentPage, totalPages) => {
        paginationControls.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            if (i === currentPage) {
                button.disabled = true;
            }
            button.addEventListener('click', () => {
                displayImages(i, allImages);
                updatePaginationControls(i, totalPages);
            });
            paginationControls.appendChild(button);
        }
    };

    fetchImages();
});
