/* ==============================
   ゲーム共通操作
================================ */

import {
  clearGameStorage,
  scrollToElement
} from "./common.js";

export function initGameControls() {
  setupNextButtons();
  setupRestartButton();
}

function setupNextButtons() {
  const nextButtons = document.querySelectorAll(
    ".next-button"
  );

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const target = targetId
        ? document.getElementById(targetId)
        : null;

      if (!target) {
        return;
      }

      target.hidden = false;
      target.classList.remove("hidden");
      scrollToElement(target);

      button.disabled = true;
    });
  });
}

function setupRestartButton() {
  const restartButton = document.getElementById(
    "restart-button"
  );

  if (!restartButton) {
    return;
  }

  restartButton.addEventListener("click", () => {
    clearGameStorage();
    window.location.replace("index.html");
  });
}
