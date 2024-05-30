document.addEventListener('DOMContentLoaded', () => {
    const shoes = Array(60).fill().map((_, i) => `resources/generic-shoe.jpg`); // Array of 60 shoe images
    const shoesPerPage = 6;
    const totalPages = Math.ceil(shoes.length / shoesPerPage);
    const shoeGallery = document.getElementById('shoe-gallery');
    const paginationControls = document.getElementById('pagination-controls');

    function loadPage(page) {
        shoeGallery.innerHTML = '';
        const start = (page - 1) * shoesPerPage;
        const end = start + shoesPerPage;
        const currentShoes = shoes.slice(start, end);

        for (let i = 0; i < currentShoes.length; i += 2) {
            const column = document.createElement('div');
            column.className = 'column';

            for (let j = 0; j < 2 && i + j < currentShoes.length; j++) {
                const photo = document.createElement('div');
                photo.className = 'photo';
                const link = document.createElement('a');
                link.href = 'shoe-page.html';
                const img = document.createElement('img');
                img.src = currentShoes[i + j];
                img.alt = '';

                link.appendChild(img);
                photo.appendChild(link);
                column.appendChild(photo);
            }

            shoeGallery.appendChild(column);
        }
    }

    function createPagination() {
        paginationControls.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', () => loadPage(i));
            paginationControls.appendChild(button);
        }
    }

    createPagination();
    loadPage(1);
});
