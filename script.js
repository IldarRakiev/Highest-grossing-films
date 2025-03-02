document.addEventListener("DOMContentLoaded", function () {
    fetch("films.json?v=1")
        .then(response => response.json())
        .then(data => {
            displayFilms(data);
            setupFilters(data);
        })
        .catch(error => console.error("Error loading JSON:", error));
});

function displayFilms(films) {
    const container = document.getElementById("films-container");
    container.innerHTML = "";

    films.forEach(film => {
        const filmCard = document.createElement("div");
        filmCard.className = "film-card";
        filmCard.innerHTML = `
            <h2>${film.title}</h2>
            <p><strong>Year:</strong> ${film.release_year}</p>
            <p><strong>Director:</strong> ${film.director}</p>
            <p><strong>Box Office:</strong> ${film.box_office}</p>
            <p><strong>Country:</strong> ${film.country}</p>
        `;
        container.appendChild(filmCard);
    });
}

let isDescending = true;

function setupFilters(films) {
    const searchInput = document.getElementById("search");
    const sortButton = document.getElementById("sort-by-box-office");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredFilms = films.filter(film =>
            film.title.toLowerCase().includes(query) ||
            film.director.toLowerCase().includes(query) 
        );
        displayFilms(filteredFilms);
    });

    sortButton.addEventListener("click", () => {
        let sortedFilms;
        if (isDescending) {
            sortedFilms = films.slice().sort((a, b) => b.rank - a.rank);
            sortButton.textContent = "Sort by Box Office (Ascending)";
        } else {
            sortedFilms = films.slice().sort((a, b) => a.rank - b.rank);
            sortButton.textContent = "Sort by Box Office (Descending)";
        }
        isDescending = !isDescending;
        displayFilms(sortedFilms);
    });
}
