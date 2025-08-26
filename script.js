// Select elements
const jokeContainer = document.getElementById("joke-container");
const jokeText = document.getElementById("joke-text");
const categorySelect = document.getElementById("category-select");
const generateBtn = document.getElementById("generate-btn");
const nextBtn = document.getElementById("next-btn");

let jokesList = [];
let currentJokeIndex = 0;

// Fetch jokes from API
async function fetchJokes(category) {
  try {
    const response = await fetch(
      `https://v2.jokeapi.dev/joke/${category}?amount=10`
    );
    const data = await response.json();

    // If API returns a single joke
    if (data.jokes) {
      jokesList = data.jokes.map((j) =>
        j.type === "single" ? j.joke : `${j.setup} — ${j.delivery}`
      );
    } else {
      jokesList = [
        data.type === "single" ? data.joke : `${data.setup} — ${data.delivery}`,
      ];
    } 

    currentJokeIndex = 0;
    displayJoke();
    nextBtn.disabled = jokesList.length <= 1;
  } catch (error) {
    jokeText.textContent = "Oops! Failed to fetch a joke.";
    console.error(error);
  }
}
        
// Display current joke
function displayJoke() {
  jokeText.textContent = jokesList[currentJokeIndex];
}

// Event: Generate jokes
generateBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  fetchJokes(category);
});

// Event: Show next joke
nextBtn.addEventListener("click", () => {
  if (currentJokeIndex < jokesList.length - 1) {
    currentJokeIndex++;
    displayJoke();
  }
  if (currentJokeIndex === jokesList.length - 1) {
    nextBtn.disabled = true;
  }
});


