import { fetchGames } from "../api.js";
import { initializeBuyButtons } from "../cart.js";
const FEATURED_BOX = document.querySelector("#featured-row");
const HERO_URL = "https://stesam-semester-project-2.herokuapp.com/home";
const HERO_BOX = document.querySelector("#hero-banner");

async function fetchAndDrawFeatured() {
  const products = await fetchGames(true);

  for (const product of products) {
    let imageUrl;

    if (product.image) {
      imageUrl = product.image.formats.small.url;
    } else {
      imageUrl = product.image_url;
    }

    const productNode = document.createElement("a");
    productNode.classList.add("col", "game", "card");
    productNode.href = `game-details.html?id=${product.id}`;

    productNode.innerHTML = `
      <h2 class="h5 title">${product.title}</h2>
      <img src="${imageUrl}"/>
      <p class="card-text description">${product.description}</p>
      <button class="btn btn-primary buy-btn" data-game-id="${product.id}">${product.price} kr</button>
      `;

    FEATURED_BOX.append(productNode);
  }

  initializeBuyButtons();
}

async function fetchAndDrawHero() {
  const response = await fetch(HERO_URL);
  const hero = await response.json();

  HERO_BOX.innerHTML = `
    <img id="hero-banner-image" src="${hero.hero_banner.url}"/>`;
}

// I don't utilize await here because I want both functions to run in paralell
fetchAndDrawFeatured();
fetchAndDrawHero();
