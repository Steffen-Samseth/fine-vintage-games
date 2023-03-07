import { fetchGames } from "../api.js";
import { initializeBuyButtons } from "../cart.js";
const GAMES_BOX = document.querySelector("#games-list");

async function fetchAndDrawGames() {
  const games = await fetchGames(false);

  for (const game of games) {
    let imageUrl;

    if (game.image) {
      imageUrl = game.image.formats.small.url;
    } else {
      imageUrl = game.image_url;
    }

    const productNode = document.createElement("li");
    productNode.classList.add("game");

    productNode.innerHTML = `
      <a href="game-details.html?id=${game.id}">
        <h2 class="h5 title">${game.title}</h2>
        <img class="game-image" src="${imageUrl}"/>
        <p class="card-text description">${game.description}</p>
        <button class="btn btn-primary buy-btn" data-game-id="${game.id}">${game.price} kr</button>
      </a>
      `;

    GAMES_BOX.append(productNode);
  }
  initializeBuyButtons();
}

await fetchAndDrawGames();
