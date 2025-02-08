const movies = [
    { title: "Гарри Поттер", description: "История о юном волшебнике.", image: "images/Harry Potter.webp" },
    { title: "Интерстеллар", description: "Фантастический фильм о путешествиях через червоточину.", image: "images/Interstellar.webp" },
    { title: "Начало", description: "Фильм о проникновении в сны.", image: "images/Inception.webp" },
    { title: "Матрица", description: "Фантастический боевик о виртуальной реальности.", image: "images/Matrix.webp" },
    { title: "Крестный отец", description: "Классика о мафии и семье.", image: "images/Godfather.webp" },
    { title: "Темный рыцарь", description: "Бэтмен против Джокера.", image: "images/Dark Knight.webp" },
    { title: "Побег из Шоушенка", description: "История о надежде и свободе.", image: "images/Shawshank.webp" },
    { title: "Форрест Гамп", description: "Жизнь как коробка шоколадных конфет.", image: "images/Forrest Gump.webp" },
    { title: "Бойцовский клуб", description: "Правила бойцовского клуба.", image: "images/Fight Club.webp" },
    { title: "Зеленая миля", description: "История о чудесах и человечности.", image: "images/Green Mile.webp" },
    { title: "Список Шиндлера", description: "История о спасении во время Холокоста.", image: "images/Schindler's List.webp" },
    { title: "Властелин колец", description: "Эпическое фэнтези о кольце всевластия.", image: "images/Fellowship of the Ring.webp" },
    { title: "Титаник", description: "История любви на фоне крушения корабля.", image: "images/Titanic.webp" },
    { title: "Аватар", description: "Фантастика о планете Пандора.", image: "images/Avatar.webp" },
    { title: "Джокер", description: "История становления злодея.", image: "images/Joker.webp" },
    { title: "Человек-паук", description: "Приключения супергероя.", image: "images/SpiderMan.webp" },
    { title: "Тор", description: "Бог грома из скандинавской мифологии.", image: "images/Thor.webp" },
    { title: "Мстители", description: "Команда супергероев.", image: "images/Avengers.webp" },
    { title: "Черная пантера", description: "История о Ваканде.", image: "images/BlackPanther.webp" },
    { title: "Дюна", description: "Фантастика о пустынной планете.", image: "images/Dune.webp" },
];

let currentPage = 1;
const moviesPerPage = 10;

// Функция для отображения фильмов
function renderMovies(moviesArray) {
    const moviesContainer = document.getElementById("movies-container");
    moviesContainer.innerHTML = "";

    const start = (currentPage - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    const moviesToShow = moviesArray.slice(start, end);

    moviesToShow.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}" onerror="this.src='images/placeholder.jpg';">
        <h3>${movie.title}</h3>
        <p>${movie.description}</p>
      `;

        moviesContainer.appendChild(movieCard);
    });

    document.getElementById("page-info").textContent = `Страница ${currentPage}`;
    document.getElementById("prev-page").disabled = currentPage === 1;
    document.getElementById("next-page").disabled = end >= moviesArray.length;
}

// Пагинация
document.getElementById("next-page").addEventListener("click", () => {
    currentPage++;
    renderMovies(movies);
});

document.getElementById("prev-page").addEventListener("click", () => {
    currentPage--;
    renderMovies(movies);
});

// Поиск фильмов
document.getElementById("search").addEventListener("input", (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchText)
    );
    currentPage = 1;
    renderMovies(filteredMovies);
});

// Смена темы
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    themeToggle.textContent = body.classList.contains("dark-theme") ? "☀️" : "🌙";
    localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
});

// Применение темы при загрузке страницы
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
    themeToggle.textContent = "☀️";
} else {
    body.classList.remove("dark-theme");
    themeToggle.textContent = "🌙";
}

// Открытие страницы с фильмом
const moviesContainer = document.getElementById("movies-container");
const movieDetail = document.getElementById("movie-detail");
const detailImage = document.getElementById("detail-image");
const detailTitle = document.getElementById("detail-title");
const detailDescription = document.getElementById("detail-description");
const closeDetail = document.getElementById("close-detail");

moviesContainer.addEventListener("click", (event) => {
    const movieCard = event.target.closest(".movie-card");
    if (movieCard) {
        const title = movieCard.querySelector("h3").textContent;
        const movie = movies.find((m) => m.title === title);
        if (movie) {
            detailImage.src = movie.image;
            detailTitle.textContent = movie.title;
            detailDescription.textContent = movie.description;
            movieDetail.classList.remove("hidden");
        }
    }
});

// Закрытие страницы с фильмом
closeDetail.addEventListener("click", () => {
    movieDetail.classList.add("hidden");
});

// Кнопка "Смотреть фильм"
document.getElementById("watch-movie").addEventListener("click", () => {
    alert("Фильм будет воспроизведен...");
});

// Первоначальная загрузка фильмов
renderMovies(movies);