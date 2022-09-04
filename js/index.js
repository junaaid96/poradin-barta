const loadCategories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}

const displayCategories = categories => {
    const categoryMenu = document.getElementById('category-menu');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('d-flex');
        categoryDiv.innerHTML =
            `
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link mx-5" aria-current="page" href="#">${category.category_name}</a>
            </li>
            </ul>
        `;
        categoryMenu.appendChild(categoryDiv);
    });
}

loadCategories();