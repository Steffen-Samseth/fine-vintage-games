import { initializeBuyButtons } from "../cart.js";

const GAME_URL = "https://stesam-semester-project-2.herokuapp.com/products/";
const GAME_CONTAINER = document.getElementById("game-details");

async function fetchAndDrawGame() {
  const gameId = new URLSearchParams(location.search).get("id");
  const response = await fetch(GAME_URL + gameId);
  const game = await response.json();

  let imageUrl;

  if (game.image) {
    imageUrl = game.image.url;
  } else {
    imageUrl = game.image_url;
  }

  const gameDiv = document.createElement("div");
  gameDiv.classList.add("game", "game-details");

  gameDiv.innerHTML = `
    <h1 class="title">${game.title}</h1>
    <img class="game-image" src="${imageUrl}"/>
    <p class="card-text description">${game.description}</p>
    <button href="#" data-game-id="${game.id}" class="btn btn-primary buy-btn">${game.price} kr</button>
    `;

  GAME_CONTAINER.append(gameDiv);
  initializeBuyButtons();
}

await fetchAndDrawGame();
