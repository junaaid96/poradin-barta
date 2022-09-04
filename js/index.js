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
                    <p class="card-text my-3">${news.details.slice(0, 300)}</p>
                    <p class="card-text text-truncate my-3">${news.details.slice(300)}</p>
                    <div class="d-flex justify-content-between mt-5">
                        <div class="d-flex">
                            <img src="${news.author.img}" class="rounded-circle" alt="..." width="40" height="40">
                            <p class="mx-3">${news.author.name ? news.author.name : 'author info not available!'}</p>
                        </div>
                        <p><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 'total views not available!'}</p>
                        <button onclick="loadNewsModal('${news._id}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#newsModal">View News</button> 
                    </div>          
                </div>
            </div>
        </div>
        `;
        allNewsCard.appendChild(allNewsDiv);
    });

}

const loadNewsModal = async newsID => {
    const url = `https://openapi.programming-hero.com/api/news/${newsID}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsModal(data.data);
}

const displayNewsModal = allNewsModal => {
    const modalSection = document.getElementById('view-news-modal');
    allNewsModal.forEach(newsModal => {
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML =
            `
        <div class="modal-header">
            <h5 class="modal-title" id="newsModalLabel">${newsModal.title}</h5>
        </div>
        <div class="modal-body">
            <p class="card-text my-3">${newsModal.details.slice(0, 300)}</p>
            <div class="d-flex justify-content-between mt-5">
                <div class="d-flex">
                    <img src="${newsModal.author.img}" class="rounded-circle" alt="..." width="40" height="40">
                    <p class="mx-3">${newsModal.author.name ? newsModal.author.name : 'author info not available!'}</p>
                </div>
                <p><i class="fa-regular fa-eye"></i> ${newsModal.total_view ? newsModal.total_view : 'total views not available!'}</p>
            </div>    
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
        </div>
        `;
        modalSection.appendChild(modalDiv);
        console.log(newsModal.title);
    });
}

loadNews(8);

