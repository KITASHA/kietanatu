/* ==============================
   対象者記録照会
================================ */

import {
  getStoredBirthDate,
  normalizeDigits,
  scrollToElement
} from "./common.js";

export function initSubjectSearch() {
  const searchKeyInput = document.getElementById(
    "subject-search-key"
  );
  const searchButton = document.getElementById(
    "subject-search-button"
  );
  const searchMessage = document.getElementById(
    "subject-search-message"
  );
  const subjectRecord = document.getElementById(
    "subject-record"
  );

  if (
    !searchKeyInput ||
    !searchButton ||
    !searchMessage ||
    !subjectRecord
  ) {
    return;
  }

  const storedBirthDate = getStoredBirthDate();

  if (!storedBirthDate) {
    return;
  }

  searchButton.addEventListener("click", searchSubject);

  searchKeyInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    searchSubject();
  });

  searchKeyInput.addEventListener("input", () => {
    searchKeyInput.value = normalizeDigits(
      searchKeyInput.value,
      8
    );
    clearMessage();
  });

  function searchSubject() {
    const enteredSearchKey = normalizeDigits(
      searchKeyInput.value,
      8
    );

    hideRecord();

    if (!enteredSearchKey) {
      showError("検索キーを入力してください。");
      searchKeyInput.focus();
      return;
    }

    if (enteredSearchKey.length !== 8) {
      showError(
        "検索キーを半角数字8桁で入力してください。"
      );
      searchKeyInput.focus();
      return;
    }

    if (enteredSearchKey !== storedBirthDate) {
      showError(
        "該当する対象者記録は見つかりませんでした。"
      );
      searchKeyInput.select();
      return;
    }

    clearMessage();
    subjectRecord.hidden = false;
    scrollToElement(subjectRecord);
  }

  function showError(message) {
    searchMessage.textContent = message;
    searchMessage.classList.add("is-error");
  }

  function clearMessage() {
    searchMessage.textContent = "";
    searchMessage.classList.remove("is-error");
  }

  function hideRecord() {
    subjectRecord.hidden = true;
  }
}
