/* ==============================
   議会資料番号検索
================================ */

import {
  normalizeDigits
} from "./common.js";

const SECRET_DOCUMENT_NUMBER = "69_0216";

const PUBLIC_DOCUMENT_NUMBERS = new Set([
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
]);

export function initArchiveSearch() {
  const archiveButton = document.getElementById(
    "archive-button"
  );

  const archiveInput = document.getElementById(
    "archive-code"
  );

  const message = document.getElementById(
    "error-message"
  );

  if (!archiveButton || !archiveInput || !message) {
    return;
  }

  let isComposing = false;

  archiveButton.addEventListener(
    "click",
    searchArchive
  );

  archiveInput.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();
      searchArchive();
    }
  );

  archiveInput.addEventListener(
    "compositionstart",
    () => {
      isComposing = true;
    }
  );

  archiveInput.addEventListener(
    "compositionend",
    () => {
      isComposing = false;

      formatInputWhileTyping();
      clearMessage();
    }
  );

  archiveInput.addEventListener(
    "input",
    () => {
      if (isComposing) {
        return;
      }

      formatInputWhileTyping();
      clearMessage();
    }
  );

  function formatInputWhileTyping() {
    const oldValue = archiveInput.value;

    const oldCursorPosition =
      archiveInput.selectionStart ?? oldValue.length;

    /*
     * カーソルより前に入力されていた
     * 数字の桁数を取得する
     */
    const digitsBeforeCursor = normalizeDigits(
      oldValue.slice(0, oldCursorPosition)
    ).length;

    const formattedValue =
      formatDocumentNumber(oldValue);

    archiveInput.value = formattedValue;

    /*
     * アンダーバーより後ろにカーソルがある場合は、
     * アンダーバー1文字分を加算する
     */
    let newCursorPosition = digitsBeforeCursor;

    if (digitsBeforeCursor > 2) {
      newCursorPosition += 1;
    }

    /*
     * 入力欄の範囲外にならないように調整する
     */
    newCursorPosition = Math.min(
      newCursorPosition,
      formattedValue.length
    );

    archiveInput.setSelectionRange(
      newCursorPosition,
      newCursorPosition
    );
  }

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

    if (code === SECRET_DOCUMENT_NUMBER) {
      window.location.href = "archive.html";
      return;
    }

    if (PUBLIC_DOCUMENT_NUMBERS.has(code)) {
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

  function showMessage(
    text,
    stateClass
  ) {
    message.textContent = text;
    message.className =
      `search-message ${stateClass}`;
  }

  function clearMessage() {
    message.textContent = "";
    message.className = "search-message";
  }
}

function formatDocumentNumber(value) {
  const digits = normalizeDigits(
    value,
    6
  );

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}_${digits.slice(2)}`;
}