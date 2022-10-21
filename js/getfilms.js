const DOMAIN = 'http://localhost:8000/'
const URI_CAT = 'api/v1/titles/?sort_by=-imdb_score&page_size=7'

function prom(url) {
    // returns a promise
    var p = new Promise(function (resolved, rejected) {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.timeout = 2000; // ms
        req.onload = function () {
            if (this.status == 200) {
                /* send req content in resolved function */
                resolved(this.response);
            } else {
                rejected("Erreur HTTP n°" + this.status + " : " + this.statusText);
            }
        }
        req.ontimeout = function () { rejected("Erreur timeout"); }
        req.onerror = function () { rejected("Erreur réseau"); }
        req.send();
    });
    return p
}

async function getFilms(cat) {
    switch (cat) {
        case 'tops':
            var url = DOMAIN + URI_CAT
            var section = 'section_top'
            break;
        case 'cat_1':
            var url = DOMAIN + URI_CAT + '&genre=Comedy'
            var section = 'section_1'
            document.querySelector('#cat_1 h2').innerHTML = "Comédie"
            break;
        case 'cat_2':
            var url = DOMAIN + URI_CAT + '&genre=Drama'
            var section = 'section_2'
            document.querySelector('#cat_2 h2').innerHTML = "Drame"
            break;
        case 'cat_3':
            var url = DOMAIN + URI_CAT + '&genre=Romance'
            var section = 'section_3'
            document.querySelector('#cat_3 h2').innerHTML = "Romance"
            break;
    }
    var content = await prom(url)
    contentJSON = JSON.parse(content)
    results = contentJSON.results
    document.getElementById(section).innerHTML = ''
    for (var film in results) {
        document.getElementById(section).innerHTML += `
        <div class="item" onclick="openModal('${results[film].id}')">
            <img src="${results[film].image_url}" alt="${results[film].title}">
        </div>`
    }
}

async function getFilmDetails(film_id) {
    /** 
     * Get unique film details from api endpoint
     * Then write html infos in the modal window
     * NB : Async functions always return a promise
     */

    // Get film endpoint
    var url = DOMAIN + 'api/v1/titles/' + film_id
    // get film details
    var details = await prom(url) // resolved value of the promise
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
    box_office = detailsJSON.worldwide_gross_income ? detailsJSON.worldwide_gross_income : "NC"
    resume = detailsJSON.long_description

    // Write details to modal
    modal_title = document.querySelector('.modal h3')
    modal_title.innerHTML = title

    modal_infos = document.querySelector('#modal_infos')
    modal_infos.innerHTML = `
        <div class="Stars" style="--rating: ${score / 2};" title="Score Imdb : ${score}"></div>
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
        </ul>
        <p><b class="resume">Résumé</b> : ${resume}</p>
        `

    modal_poster = document.querySelector('#modal_poster')
    modal_poster.innerHTML = `
        <img src="${img_url}" alt="${title}" />`
}


async function getBestFilmDetails() {
    /** 
     * Get unique best film details from api endpoint
     * Then write html in main block
     * NB : Async functions always return a promise
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
    title = detailsJSON.title
    img_url = detailsJSON.image_url
    score = parseFloat(detailsJSON.imdb_score)
    resume = detailsJSON.long_description

    // Write details to block best film
    infos = document.querySelector('#infos_best')
    infos.innerHTML = `
        <h1>${title}</h1>
        <p>${resume}</p>
        <div class="Stars" style="--rating: ${score / 2};" title="Imdb score : ${score}"></div>
        <div><a href="#" class="button" onclick="openModal('${id}')">En savoir plus</a></div>`
    main_poster = document.querySelector('#main_poster')
    main_poster.innerHTML = `
        <img src="${img_url}" alt="${title}" />`
}


function openModal(film_id) {

    getFilmDetails(film_id)

    const modal = document.querySelector(".modal")
    const overlay = document.querySelector(".overlay")
    const closeModalBtn = document.querySelector(".btn-close")

    // close modal function
    const closeModal = function () {
        modal.classList.add("hidden")
        overlay.classList.add("hidden")
    };

    // close the modal when the close button and overlay is clicked
    closeModalBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    // close modal when the Esc key is pressed
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal()
        }
    });

    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}
