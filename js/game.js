document.addEventListener("DOMContentLoaded", () => {
  setupArchiveSearch();
  setupNextButtons();
  setupRestartButton();
});

/**
 * 資料番号の検索
 */
function setupArchiveSearch() {
  const archiveButton = document.getElementById("archive-button");
  const archiveInput = document.getElementById("archive-code");
  const errorMessage = document.getElementById("error-message");

  if (!archiveButton || !archiveInput || !errorMessage) {
    return;
  }

  archiveButton.addEventListener("click", searchArchive);

  archiveInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchArchive();
    }
  });

  archiveInput.addEventListener("input", () => {
  errorMessage.textContent = "";

  let value = archiveInput.value.replace(/[^0-9A-Za-z]/g, "");

  // 最大6文字（69 + 0216）
  value = value.slice(0, 6);

  // 2文字目の後ろに自動で _
  if (value.length > 2) {
    value = value.slice(0, 2) + "_" + value.slice(2);
  }

  archiveInput.value = value;
});

 function searchArchive() {
  const code = archiveInput.value
    .trim()
    .replace("_", "");

  if (code === "690216") {
    window.location.href = "archive.html";
    return;
  }

  errorMessage.textContent =
    "該当する資料は見つかりませんでした。";

  archiveInput.select();
}
}

/**
 * 「次の記録を開く」ボタン
 */
function setupNextButtons() {
  const nextButtons = document.querySelectorAll(".next-button");

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;

      if (!targetId) {
        return;
      }

      const target = document.getElementById(targetId);

      if (!target) {
        return;
      }

      target.hidden = false;
      target.classList.remove("hidden");

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      button.disabled = true;
    });
  });
}

/**
 * ゲームを最初から始める
 */
function setupRestartButton() {
  const restartButton = document.getElementById("restart-button");

  if (!restartButton) {
    return;
  }

  restartButton.addEventListener("click", () => {
    sessionStorage.clear();
    localStorage.clear();

    window.location.replace("index.html");
  });
}