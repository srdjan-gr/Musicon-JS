import keys from './auth.js'

const searhEl = document.getElementById('search');
const searchResaultEl = document.getElementById('searchResault');
const searchBtnEl = document.getElementById('searchBtn');
const cardEl = document.getElementById('card');

let isLoading = false;



searchBtnEl.addEventListener('click', async () => {
    searchResaultEl.value = '';
    cardEl.innerHTML = ''

    isLoading = true
    showSearchString();

    const res = await fetch(`https://api.discogs.com/database/search?q=${searhEl.value}&key=${keys.key}&secret=${keys.sec}`)
        .then((response) => response.json())
        .then((data) => showSearcResault(data));
});


const showSearchString = () => {
    searchResaultEl.value += `${searhEl.value}`;
}

const showSearcResault = (data) => {

    data.results.forEach(element => {
        cardEl.innerHTML += `
            <div class="col">
                <div class="card mb-4" style="width: 18rem;">
                    <img src=${element.cover_image} class="card-img-top" style="height: 18rem; object-fit: cover; " alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">Some quick example text to .</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
            </div>
        `
    });

    searhEl.value = '';

}

