const DOMAIN = 'http://localhost:8000/'

function prom(url) {
    // returns a promise
    var p = new Promise(function (resolved, rejected) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", url, true);
        ajax.timeout = 2000; // ms
        ajax.onload = function () {
            if (this.status == 200) {
                /* send ajax content in resolved function */
                resolved(this.response);
            } else {
                rejected("Erreur HTTP n°" + this.status + " : " + this.statusText);
            }
        }
        ajax.ontimeout = function () { rejected("Erreur timeout"); }
        ajax.onerror = function () { rejected("Erreur réseau"); }
        ajax.send();
    });
    return p
}

async function getFilms(url, query_selector) {
    var content = await prom(url) // resolved value of the promise
    contentJSON = JSON.parse(content)
    results = contentJSON.results
    document.querySelector(query_selector).innerHTML = ``
}


async function getBestFilmDetails(callback_modal) {
    /** 
     * Get unique best film details from api endpoint
     * Then write html in main block and in the modal window
     * NB : Async functions always return a promise
     * 
     * Pass openModal as a callback to this function, so that it will be called AFTER button "open-modal" is created
     */

    // Get best film endpoint
    var content = await prom(DOMAIN + 'api/v1/titles/?sort_by=-imdb_score&page_size=1') // resolved value of the promise
    contentJSON = JSON.parse(content)
    results = contentJSON.results
    id = results[0].id
    url_best_film = DOMAIN + 'api/v1/titles/' + id

    // get best film details
    var details = await prom(url_best_film)
    detailsJSON = JSON.parse(details)
    console.log(detailsJSON)
    title = detailsJSON.title
    img_url = detailsJSON.image_url
    genres = detailsJSON.genres.join(", ")
    date = detailsJSON.date_published
    rating = detailsJSON.avg_vote
    score = parseFloat(detailsJSON.imdb_score)
    directors = detailsJSON.directors.join(", ")
    actors = detailsJSON.directors.join(", ")
    duration = detailsJSON.duration
    countries = detailsJSON.countries.join(", ")
    box_office = detailsJSON.worldwide_gross_income
    resume = detailsJSON.long_description
    
    // Write details to block best film
    infos = document.querySelector('#infos_best')
    infos.innerHTML = `
        <h1>${title}</h1>
        <p>${resume}</p>
        <div class="Stars" style="--rating: ${score / 2};" title="Imdb score : ${score}"></div>
        <div><a href="#" class="button open-modal">En savoir plus</a></div>`  
    main_poster = document.querySelector('#main_poster')
    main_poster.innerHTML = `
        <img src="${img_url}" />`

    // Write details to modal
    modal_title = document.querySelector('.modal h3')
    modal_title.innerHTML = title

    modal_infos = document.querySelector('#modal_infos')
    modal_infos.innerHTML = `
        <div class="Stars" style="--rating: ${score / 2};" title="Imdb score : ${score}"></div>
        <ul>
            <li><b>Réalisateur(s)</b> : ${directors}</li>
            <li><b>Avec</b> : ${actors}</li>
            <li><b>Note</b> : ${rating}</li>
            <li><b>Date de sortie</b> : ${date}</li>
            <li><b>Genre(s)</b> : ${genres}</li>
            <li><b>Score Imdb</b> : ${score}</li>
            <li><b>Durée</b> : ${duration}</li>
            <li><b>Pays d’origine</b> : ${countries}</li>
            <li><b>Résultat au Box Office</b> : ${box_office}</li>
            <li><b>Résumé</b> : ${resume}</li>
        </ul>`

    modal_poster = document.querySelector('#modal_poster')
    modal_poster.innerHTML = `
        <img src="${img_url}" />`

    callback_modal();
}


async function getBestFilm(url) {
    /* Async functions always return a promise */
    var content = await prom(url) // resolved value of the promise
    contentJSON = JSON.parse(content)
    results = contentJSON.results
    // txt infos
    infos = document.querySelector('#infos_best')
    title = results[0].title
    director = results[0].directors[0]
    actors = results[0].actors.join(", ")
    score = parseFloat(results[0].imdb_score) / 2
    infos.innerHTML = `
        <h1>${title}</h1>
        <p><strong>Réalisateur</strong> : ${director}</p>
        <p><strong>Avec</strong> : ${actors}</p>
        <div class="Stars" style="--rating: ${score};" title="Imdb score"></div>
        <div><a href="#" class="button open-modal">En savoir plus</a></div>`

    // img
    poster = document.querySelector('#poster')
    img_url = results[0].image_url
    poster.innerHTML = `
        <img src="${img_url}" />`

}


function openModal() {
    
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".open-modal"); // todo modifier avec querySelectorAll (sinon ne prend que le premier) + vérifier que l'élément est bien chargé
    const closeModalBtn = document.querySelector(".btn-close");

    // close modal function
    const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    };

    // close the modal when the close button and overlay is clicked
    closeModalBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    // close modal when the Esc key is pressed
    document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
    });

    // open modal function
    const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    };
    // open modal event
    openModalBtn.addEventListener("click", openModal);

}
