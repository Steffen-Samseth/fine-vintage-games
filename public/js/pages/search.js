const searchBox = document.getElementById("search");

searchBox.addEventListener("input", (e) => {
  const searchText = searchBox.value.trim().toLowerCase();

  for (const game of document.querySelectorAll(".game")) {
    const gameTitle = game
      .querySelector(".title")
      .innerText.trim()
      .toLowerCase();
    const gameDescription = game
      .querySelector(".description")
      .innerText.trim()
      .toLowerCase();

    if (
      gameTitle.indexOf(searchText) >= 0 ||
      gameDescription.indexOf(searchText) >= 0
    ) {
      game.style.display = "initial";
    } else {
      game.style.display = "none";
    }
  }
});
