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

  searchButton.addEventListener("click", searchSubject);

  searchKeyInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchSubject();
    }
  });

  searchKeyInput.addEventListener("input", () => {
    searchMessage.textContent = "";
    searchMessage.classList.remove("is-error");
  });

  function searchSubject() {
    const correctSearchKey = getStoredBirthDate();

    const enteredSearchKey = searchKeyInput.value.replace(
      /\D/g,
      ""
    );

    if (!correctSearchKey) {
      hideRecord();

      showError(
        "検索キー情報を取得できませんでした。"
      );

      return;
    }

    if (enteredSearchKey === "") {
      hideRecord();

      showError(
        "検索キーを入力してください。"
      );

      searchKeyInput.focus();
      return;
    }

    if (enteredSearchKey !== correctSearchKey) {
      hideRecord();

      showError(
        "該当する対象者記録は見つかりませんでした。"
      );

      searchKeyInput.select();
      return;
    }

    searchMessage.textContent = "";
    searchMessage.classList.remove("is-error");

    subjectRecord.hidden = false;

    subjectRecord.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function getStoredBirthDate() {
    const storedValue =
      sessionStorage.getItem("playerBirthDate") ||
      sessionStorage.getItem("birthDate") ||
      sessionStorage.getItem("birthday");

    if (!storedValue) {
      return null;
    }

    return storedValue.replace(/\D/g, "");
  }

  function showError(message) {
    searchMessage.textContent = message;
    searchMessage.classList.add("is-error");
  }

  function hideRecord() {
    subjectRecord.hidden = true;
  }
});