import { fetchGames, deleteGame } from "../api.js";

const GAMES = document.querySelector("#admin-games tbody");

if (!localStorage.getItem("auth")) {
  alert("Please log in before attempting to access this page");
  window.location = "login.html";
}

async function fetchAndDrawGames() {
  const allGames = await fetchGames(false, "id");

  for (const game of allGames) {
    let imageUrl;

    if (game.image) {
      imageUrl = game.image.formats.thumbnail.url;
    } else {
      imageUrl = game.image_url;
    }

    const gameRow = document.createElement("tr");
    gameRow.classList.add("game");
    gameRow.innerHTML = `
      <td>${game.id}</td>
      <td>
        <div class="image-wrapper">
          <img src="${imageUrl}" />
        </div>
      </td>
      <td>${game.title}</td>
      <td>${game.description}</td>
      <td>${game.price} kr</td>
      <td>${(game.featured && "Yes") || "No"}</td>
      <td>
        <div class="btn-group btn-group-sm" role="group">
          <button class="btn btn-primary edit-game" title="Edit game"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-danger delete-game" title="Delete game"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;

    GAMES.append(gameRow);

    gameRow.querySelector("button.edit-game").addEventListener("click", (e) => {
      window.location = "game-form.html?game-id=" + game.id;
    });

    gameRow
      .querySelector("button.delete-game")
      .addEventListener("click", async (e) => {
        console.log("Deleting game:", game);

        if(confirm("Confirm you want to delete game: " + game.title)) {
          await deleteGame(game.id);
          gameRow.remove();
        }
      });
  }
}

await fetchAndDrawGames();
