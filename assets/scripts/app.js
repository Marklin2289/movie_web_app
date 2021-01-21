// const addMovieModal = document.querySelector("#add-modal");
const addMovieModal = document.getElementById("add-modal");

const startAddMovieButton = document.querySelector("header button");

const backdrop = document.getElementById("backdrop");

const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const updatedUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const closeMovieDeletion = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  closeMovieDeletion();
  updatedUI();
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelButtonDeletion = deleteMovieModal.querySelector(".btn--passive");
  let confirmButtonDeletion = deleteMovieModal.querySelector(".btn--danger");
  confirmButtonDeletion.replaceWith(confirmButtonDeletion.cloneNode(true));
  confirmButtonDeletion = deleteMovieModal.querySelector(".btn--danger");
  cancelButtonDeletion.removeEventListener("click", closeMovieDeletion);
  cancelButtonDeletion.addEventListener("click", closeMovieDeletion);
  confirmButtonDeletion.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
  // deleteMovie(movieId);
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const NewMovieElement = document.createElement("li");
  NewMovieElement.className = "movie-element";
  NewMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5</p>
  </div>
  `;
  NewMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.append(NewMovieElement);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletion();
  clearMovieInput();
};

const cancelAddMovie = () => {
  closeMovieModal();
  clearMovieInput();
  toggleBackdrop();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue <= 1 ||
    +ratingValue >= 5
  ) {
    alert("Please enter valid values between 1 to 5.");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  clearMovieInput();
  toggleBackdrop();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updatedUI();
};
startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovie);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
