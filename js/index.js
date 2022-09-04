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
            <li class="nav-item" onclick="loadNews(${category.category_id})">
                <a class="nav-link mx-3" aria-current="page" href="#">${category.category_name}</a>
            </li>
            </ul>
        `;
        categoryMenu.appendChild(categoryDiv);
    });
}

loadCategories();

const loadNews = async categoryID => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryID}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);

}

const displayNews = allNews => {
    const allNewsCard = document.getElementById('all-news');
    allNewsCard.textContent = '';
    allNews.forEach(news => {
        const allNewsDiv = document.createElement('div');
        allNewsDiv.innerHTML = 
        `
        <div class="row g-0 my-3 border p-2 rounded-3">
            <div class="col-md-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text my-3">${news.details}</p>
                             
                </div>
            </div>
        </div>
        `;
        allNewsCard.appendChild(allNewsDiv);
    });
}
    