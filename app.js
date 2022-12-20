import keys from './auth.js'

const searhEl = document.getElementById('search');
const searchResaultEl = document.getElementById('searchResault');
const searchBtnEl = document.getElementById('searchBtn');
const cardEl = document.getElementById('card');
const paginationEl = document.getElementById('pagination');

let isLoading = false;


window.addEventListener('load', () => {
    showPagination();
})


// Searsh on Enter pres
searhEl.addEventListener('keypress', async (e) => {

    if (e.key === 'Enter') {
        searchResaultEl.value = '';
        cardEl.innerHTML = ''

        isLoading = true
        showSearchString();

        const res = await fetch(`https://api.discogs.com/database/search?q=${searhEl.value}&key=${keys.key}&secret=${keys.sec}&per_page=10&page=1`)
            .then((response) => response.json())
            .then((data) => showSearcResault(data));
    }
});

// Searsh on click
searchBtnEl.addEventListener('click', async () => {

    searchResaultEl.value = '';
    cardEl.innerHTML = ''

    isLoading = true
    showSearchString();

    const res = await fetch(`https://api.discogs.com/database/search?q=${searhEl.value}&key=${keys.key}&secret=${keys.sec}&per_page=10&page=1`)
        .then((response) => response.json())
        .then((data) => showSearcResault(data));

});


// Prikaz reci koja je pretrazivana
const showSearchString = () => {
    searchResaultEl.value += `${searhEl.value}`;
}


// Prikaz rezultata pretrage
const showSearcResault = (data) => {

    data.results.forEach(element => {
        cardEl.innerHTML += `
            <div class="col d-flex align-items-center justify-content-center">
                <div class="card mb-4 " style="width: 18rem;">
                    <img src=${element.cover_image} class="card-img-top" style="height: 20rem; object-fit: cover; " alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Release date: ${element.year}</li>
                    </ul>
                    <div class="card-body">
                        <a href=${element.resource_url} target="_blank" class="card-link">Relese details</a>
                    </div>
                </div>
            </div>
        `
        console.log(element);
    });

    searhEl.value = '';
}


//Prikaz Paginacie
const showPagination = () => {
    paginationEl.innerHTML = `
        <nav aria-label="..." class="justify-content-center d-flex align-items-center">
            <ul class="pagination ">
                <li class="page-item ">
                    <a class="page-link" href="#"><</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active" aria-current="page">
                    <span class="page-link">2</span>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">></a>
                </li>
            </ul>
        </nav>
    `
}

