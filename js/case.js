document.addEventListener("DOMContentLoaded", () => {
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

  /*
   * アンケート情報が保存されていない場合は、
   * アンケートページへ戻す
   */
  if (!storedBirthDate) {
    window.location.replace("index.html");
    return;
  }

  searchButton.addEventListener(
    "click",
    searchSubject
  );

  searchKeyInput.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();
      searchSubject();
    }
  );

  searchKeyInput.addEventListener("input", () => {
    /*
     * 数字以外を除去し、最大8桁にする
     */
    searchKeyInput.value = searchKeyInput.value
      .replace(/\D/g, "")
      .slice(0, 8);

    clearMessage();
  });

  function searchSubject() {
    const enteredSearchKey =
      searchKeyInput.value.replace(/\D/g, "");

    hideRecord();

    if (!enteredSearchKey) {
      showError(
        "検索キーを入力してください。"
      );

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

    subjectRecord.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function getStoredBirthDate() {
    const storedValue =
      localStorage.getItem("playerBirthDate") ||
      localStorage.getItem("birthDate") ||
      localStorage.getItem("birthday") ||
      sessionStorage.getItem("playerBirthDate") ||
      sessionStorage.getItem("birthDate") ||
      sessionStorage.getItem("birthday");

    if (!storedValue) {
      return null;
    }

    const normalizedValue =
      storedValue.replace(/\D/g, "");

    if (normalizedValue.length !== 8) {
      return null;
    }

    return normalizedValue;
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
});