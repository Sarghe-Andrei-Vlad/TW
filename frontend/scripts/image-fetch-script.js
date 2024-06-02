// --------------------------------------- VARIANTA FUNCTIONALA
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('shoe-gallery');
    const paginationControls = document.getElementById('pagination-controls');

    const fetchImages = async (page = 1) => {
        try {
            const response = await fetch(`http://127.0.0.1:8001/images?page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const images = await response.json();
            displayImages(images);
        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
    };

    const displayImages = (images) => {
        galleryContainer.innerHTML = '';
        let columnContent = '';

        images.forEach((image, index) => {
            if (index % 2 === 0) columnContent += '<div class="column">';
            columnContent += `<div class="photo"><a href="shoe-page.html"><img src="${image.image_url}" alt=""></a></div>`;
            if (index % 2 === 1) columnContent += '</div>';
        });

        galleryContainer.innerHTML = columnContent;
    };

    fetchImages();

    paginationControls.innerHTML = `
        <button onclick="fetchImages(1)">1</button>
        <button onclick="fetchImages(2)">2</button>
        <button onclick="fetchImages(3)">3</button>
    `;
});