function toggleDropdown(categoryId) {
    var dropdown = document.getElementById(categoryId);
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

function selectOption(option) {
    option.classList.toggle('selected');
    event.stopPropagation();

    option.closest('.dropdown').style.display = 'block';
}