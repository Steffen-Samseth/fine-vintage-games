export const API_URL = "https://stesam-semester-project-2.herokuapp.com";
export const GAMES_URL = `${API_URL}/products`;
export const AUTH_URL = `${API_URL}/auth/local`;

export async function fetchGames(featured, sortBy = "title") {
  const url = GAMES_URL + `?_sort=${sortBy}`;

  let response;
  if (featured) {
    response = await fetch(url + "&featured=true");
  } else {
    response = await fetch(url);
  }
  const products = await response.json();
  return products;
}

export async function fetchGame(gameId) {
  const response = await fetch(GAMES_URL + "/" + gameId);

  return await response.json();
}

export async function deleteGame(gameId) {
  const response = await fetch(GAMES_URL + "/" + gameId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("auth"),
    },
  });

  console.log(response);
  console.log(await response.json());
}

export async function createGame(formData) {
  console.log("Creating game with form data:", formData);

  const response = await fetch(GAMES_URL, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("auth"),
    },
  });

  console.log(response);
  console.log(await response.json());
}

export async function updateGame(gameId, formData) {
  console.log("Updating game", gameId, "with form data:", formData);

  const response = await fetch(GAMES_URL + "/" + gameId, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("auth"),
    },
  });

  console.log(response);
  console.log(await response.json());
}

export async function login(username, password) {
  const payload = {
    identifier: username,
    password: password,
  };

  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return await response.json();
}
