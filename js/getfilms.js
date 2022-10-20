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
    /* Async functions always return a promise */
    var content = await prom(url) // resolved value of the promise
    contentJSON = JSON.parse(content)
    results = contentJSON.results
    document.querySelector(query_selector).innerHTML = ``
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