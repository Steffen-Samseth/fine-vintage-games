import { GAMES_URL } from "../api.js";
import { loadCart, removeFromCart } from "../cart.js";

const CART = document.getElementById("cart");
const SUM = document.getElementById("sum");

function makeCartApiUrl(cart) {
  return (
    GAMES_URL +
    "?_sort=title&" +
    cart.map((gameId) => `id_in=${gameId}`).join("&")
  );
}

async function loadAndDrawCart() {
  const cart = loadCart();

  if (cart.length > 0) {
    const apiUrl = makeCartApiUrl(cart);

    const response = await fetch(apiUrl);
    const games = await response.json();

    for (const game of games) {
      let imageUrl;

      if (game.image) {
        imageUrl = game.image.formats.thumbnail.url;
      } else {
        imageUrl = game.image_url;
      }

      const gameRow = document.createElement("a");
      gameRow.href = "game-details.html?id=" + game.id;
      gameRow.classList.add("game");
      gameRow.dataset.price = game.price;

      gameRow.innerHTML = `
        <div class="thumbnail-wrapper">
        <img src="${imageUrl}" alt="Game cover" />
        </div>
        <h2>${game.title}</h2>
        <div class="price">${game.price} kr</div>
        <div class="buttons">
        <button class="btn btn-primary remove-from-cart">✕</button>
        </div>
        `;

      CART.append(gameRow);

      gameRow
        .querySelector("button.remove-from-cart")
        .addEventListener("click", (e) => {
          e.preventDefault();

          removeFromCart(game.id);
          gameRow.remove();

          updateEmptyCartMessage();
          updateSum();
        });
    }
  }

  updateEmptyCartMessage();
  updateSum();
}

function updateEmptyCartMessage() {
  if (CART.childNodes.length == 0) {
    CART.innerHTML = "(Cart is empty)";
  }
}

function updateSum() {
  const gameRows = CART.querySelectorAll("a.game");

  if (gameRows.length == 0) {
    SUM.innerHTML = "";
  } else {
    let sum = 0;

    for (const gameRow of gameRows) {
      sum += Number(gameRow.dataset.price);
    }

    SUM.innerHTML = `Total: ${sum} kr`;
  }
}

await loadAndDrawCart();
