window.addEventListener("load", () => {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWRmMTY2N2Y3MjNjMjUyNmI0MmUxYWJkOThlNmFlNSIsInN1YiI6IjY1ZmI3Y2MxNzcwNzAwMDE3YzA3NDE4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaWE6rfbG710SICBENB9erZWJrpWmN85IBI3ifDjXI0'
    }
  };

  var language = "pt-br";

  // Carregar o arquivo id.json para mapear os IDs de gênero
  fetch('id.json')
    .then(response => response.json())
    .then(genreData => {
      fetch(`https://api.themoviedb.org/3/movie/popular?language=${language}&page=1`, options)
        .then(response => response.json())
        .then(filmes => exibirTitulo(filmes.results, genreData.genres))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));

  var imagemURL = `https://image.tmdb.org/t/p/w500`; // Use 'poster_path' ou 'backdrop_path'

  function exibirTitulo(filmes, genres) {
    var contador = 0; // Inicialize o contador de filmes exibidos

    filmes.forEach(filme => {
      if (contador < 10) { // Verifica se ainda não exibimos 10 filmes
        var boxFilme = document.createElement("div");
        var infoFilme = document.createElement("div");

        var tituloFilme = document.createElement("h1");
        var genero = document.createElement("p");
        var sinopse = document.createElement("p");
        var capaFilme = document.createElement("img");
        var dataLancamento = document.createElement("p");
        var rate = document.createElement("p");
        var estrela = document.createElement("span");

        tituloFilme.textContent = filme.title;
        capaFilme.src = imagemURL + filme.poster_path;
        // Mapear os IDs de gênero para os nomes de gênero correspondentes em português
        var genreNames = filme.genre_ids.map(genreId => genres.find(genre => genre.id === genreId)?.name);
        genero.textContent = "Gênero: " + genreNames.join(", ");
        sinopse.textContent = "Sinopse: " + filme.overview;
        dataLancamento.textContent = "Data de Lançamento: " + filme.release_date;
        rate.textContent = "Avaliação: " + filme.vote_average;
        estrela.textContent = "★";
        estrela.style.color = "yellow";

        boxFilme.classList.add("boxFilme");
        infoFilme.classList.add("infoFilme");

        boxFilme.appendChild(capaFilme);
        infoFilme.appendChild(tituloFilme);
        infoFilme.appendChild(genero);
        infoFilme.appendChild(sinopse);
        infoFilme.appendChild(dataLancamento);
        infoFilme.appendChild(rate);
        rate.appendChild(estrela);

        boxFilme.appendChild(infoFilme);
        document.getElementById("boxFilmes").appendChild(boxFilme);

        contador++; // Incrementa o contador de filmes exibidos
      } else {
        return; // Interrompe o loop quando 10 filmes são exibidos
      }
    });
  }


  // function exibirTitulo(filmes) {
  //filmes.forEach(filme => console.log(filme));
  // }

});
