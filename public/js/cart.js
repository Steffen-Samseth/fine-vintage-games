export function toggleCart(gameId) {
  let cart = loadCart();

  if (cart.includes(gameId)) {
    cart = cart.filter(item => item != gameId);
    console.log("Removed game from cart:", gameId);
  } else {
    cart.push(gameId);
    console.log("Added game to cart:", gameId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(gameId) {
  let cart = loadCart();

  cart = cart.filter(item => item != gameId);

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function loadCart() {
  const cartJson = localStorage.getItem("cart") || "[]";

  return JSON.parse(cartJson);
}

export function initializeBuyButtons() {
  const buttons = document.querySelectorAll(".buy-btn");

  for (const button of buttons) {
    const gameId = button.dataset.gameId;

    button.addEventListener("click", (e) => {
      e.preventDefault();
      toggleCart(gameId);

      refreshBuyButton(button);
    });

    refreshBuyButton(button);
  }
}

function refreshBuyButton(button) {
  const gameId = button.dataset.gameId;
  const cart = loadCart();

  if (cart.includes(gameId)) {
    console.log("CHANGING BUTTON TEXT AWAY FROM:", button.innerText)
    button.dataset.originalText = button.innerText;

    button.innerText = "Remove from cart";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
  } else {
    if (button.dataset.originalText)
      button.innerText = button.dataset.originalText;

    button.classList.remove("btn-secondary");
    button.classList.add("btn-primary");
  }
}
