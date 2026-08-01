document.addEventListener("DOMContentLoaded", () => {
  setupArchiveSearch();
  setupNextButtons();
  setupRestartButton();
});

/* ==============================
   資料番号検索
================================ */

function setupArchiveSearch() {
  const archiveButton = document.getElementById("archive-button");
  const archiveInput = document.getElementById("archive-code");
  const message = document.getElementById("error-message");

  if (!archiveButton || !archiveInput || !message) {
    return;
  }

  const publicDocumentNumbers = [
    "41_0060",
    "42_0114",
    "49_0056",
    "43_0234",
    "44_0216",
    "51_0057",
    "52_0108",
    "53_0225",
    "59_0132",
    "54_0204",
    "61_0054",
    "62_0102"
  ];

  archiveButton.addEventListener("click", searchArchive);

  archiveInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchArchive();
    }
  });

  archiveInput.addEventListener("input", () => {
    archiveInput.value = formatDocumentNumber(
      archiveInput.value
    );

    clearMessage();
  });

  function searchArchive() {
    const code = formatDocumentNumber(
      archiveInput.value
    );

    archiveInput.value = code;

    if (code.length !== 7) {
      showMessage(
        "資料番号を正しく入力してください。",
        "is-error"
      );

      archiveInput.focus();
      return;
    }

    if (code === "69_0216") {
      window.location.href = "archive.html";
      return;
    }

    /*
     * 一覧に掲載されている資料
     */
    if (publicDocumentNumbers.includes(code)) {
      showMessage(
        `資料番号 ${code} は保管されていますが、現在は公開を停止しています。`,
        "is-restricted"
      );

      return;
    }

    showMessage(
      "該当する資料は見つかりませんでした。",
      "is-error"
    );

    archiveInput.select();
  }

  function formatDocumentNumber(value) {
    /*
     * 全角数字を半角数字へ変換
     */
    let formattedValue = value.replace(
      /[０-９]/g,
      (character) => {
        return String.fromCharCode(
          character.charCodeAt(0) - 0xfee0
        );
      }
    );

    /*
     * 数字以外を削除
     */
    formattedValue = formattedValue
      .replace(/\D/g, "")
      .slice(0, 6);

    /*
     * 2桁目の後ろに「_」を追加
     */
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) +
        "_" +
        formattedValue.slice(2);
    }

    return formattedValue;
  }

  function showMessage(text, className) {
    message.textContent = text;
    message.className = `search-message ${className}`;
  }

  function clearMessage() {
    message.textContent = "";
    message.className = "search-message";
  }
}

/* ==============================
   次の記録を開く
================================ */

function setupNextButtons() {
  const nextButtons =
    document.querySelectorAll(".next-button");

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;

      if (!targetId) {
        return;
      }

      const target =
        document.getElementById(targetId);

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

/* ==============================
   最初から始める
================================ */

function setupRestartButton() {
  const restartButton =
    document.getElementById("restart-button");

  if (!restartButton) {
    return;
  }

  restartButton.addEventListener("click", () => {
    sessionStorage.clear();
    localStorage.clear();

    window.location.replace("index.html");
  });
}