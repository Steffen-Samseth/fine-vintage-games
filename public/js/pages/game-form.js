import { fetchGame, createGame, updateGame } from "../api.js";

const GAME_FORM = document.getElementById("game-form");
const TITLE = document.getElementById("title-form-input");
const IMAGE_FILE = document.getElementById("image-file-form-input");
const IMAGE_URL = document.getElementById("image-url-form-input");
const DESCRIPTION = document.getElementById("description-form-input");
const PRICE = document.getElementById("price-form-input");
const FEATURED = document.getElementById("featured-form-input");
const SUBMIT_BUTTON = document.querySelector("button[type=submit]");

async function init() {
  const query = new URLSearchParams(location.search);
  const gameId = query.get("game-id");

  if (gameId) {
    // Was there a "game-id" query parameter in the URL? If so, this is now an
    // edit form
    document.querySelector("h1").innerText = "Edit game";

    const game = await fetchGame(gameId);

    TITLE.value = game.title;
    IMAGE_URL.value = game.image_url;
    DESCRIPTION.value = game.description;
    PRICE.value = game.price;
    FEATURED.checked = game.featured;
    SUBMIT_BUTTON.innerText = "Update game";

    if (game.image) {
      const formText = document.createElement("div");
      formText.classList.add("form-text");
      formText.innerText = "Setting a new image will overwrite the current one";
      IMAGE_FILE.parentNode.append(formText);

      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("image-wrapper");
      imageWrapper.innerHTML = `<img src="${game.image.url}" />`;
      IMAGE_FILE.parentNode.append(imageWrapper);
    }
  }

  GAME_FORM.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = collectForm();

    GAME_FORM.querySelector("fieldset").disabled = true;
    SUBMIT_BUTTON.innerHTML = `
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <span class="visually-hidden">Saving game...</span>
  `;

    if (gameId) {
      await updateGame(gameId, formData);
    } else {
      await createGame(formData);
    }

    window.location = "admin.html";
  });
}

function collectForm() {
  const formData = new FormData();

  if (IMAGE_FILE.files.length > 0) {
    formData.append("files.image", IMAGE_FILE.files[0]);
  }

  formData.append(
    "data",
    JSON.stringify({
      title: TITLE.value,
      description: DESCRIPTION.value,
      price: PRICE.value,
      image_url: IMAGE_URL.value,
      featured: FEATURED.checked,
    })
  );

  return formData;
}

await init();
