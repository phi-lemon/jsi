

  async function getFilms(url) {
    let p = new Promise(function (resolved, rejected) {
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.timeout = 2000;
        req.onload = function () {
          if (this.status == 200) { /* retour HTTP OK */
            /* On envoie le contenu AJAX dans la fonction resolved */
            resolved(this.response);
          } else { /* Code retour HTTP en erreur */
            rejected("Http error " + this.status + " : " + this.statusText);
          }
        }
        req.ontimeout = function () { rejected("Timeout error"); }
        req.onerror = function () { rejected("Network error"); }
        req.send();
      });


    let films_json = await p;
    let films = JSON.parse(films_json)
    console.log(films);
    document.getElementById("bloc_film").innerHTML = films.results[0].title;
  }