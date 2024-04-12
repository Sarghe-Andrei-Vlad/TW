document.addEventListener('DOMContentLoaded', function () {
    var openMenuBtn = document.querySelector('.open-menu-btn');
    var closeMenuBtn = document.querySelector('.close-menu-btn');
    var sideMenu = document.querySelector('.side-menu');

    openMenuBtn.addEventListener('click', function () {
        sideMenu.classList.add('show');
    });

    closeMenuBtn.addEventListener('click', function () {
        sideMenu.classList.remove('show');
    });
});