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

  const searchResult = document.getElementById(
    "subject-search-result"
  );

  const detailButton = document.getElementById(
    "subject-detail-button"
  );

  const detail1 = document.getElementById(
    "subject-detail-1"
  );

  const nextButton = document.getElementById(
    "subject-next-button"
  );

  const detail2 = document.getElementById(
    "subject-detail-2"
  );

  const testimonyButton = document.getElementById(
    "subject-testimony-button"
  );

  const detail3 = document.getElementById(
    "subject-detail-3"
  );

  const resultButton = document.getElementById(
    "subject-result-button"
  );

  const detail4 = document.getElementById(
    "subject-detail-4"
  );

  searchButton.addEventListener("click", searchSubject);

  searchKeyInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchSubject();
    }
  });

  searchKeyInput.addEventListener("input", () => {
    searchMessage.textContent = "";
  });

  detailButton.addEventListener("click", () => {
    showSection(detail1);
  });

  nextButton.addEventListener("click", () => {
    showSection(detail2);
  });

  testimonyButton.addEventListener("click", () => {
    showSection(detail3);
  });

  resultButton.addEventListener("click", () => {
    showSection(detail4);
  });

  function searchSubject() {
    const correctSearchKey = getStoredBirthDate();

    const enteredSearchKey = searchKeyInput.value.replace(
      /\D/g,
      ""
    );

    if (!correctSearchKey) {
      searchMessage.textContent =
        "検索キー情報を取得できませんでした。";

      return;
    }

    if (enteredSearchKey === "") {
      searchMessage.textContent =
        "検索キーを入力してください。";

      searchKeyInput.focus();
      return;
    }

    if (enteredSearchKey !== correctSearchKey) {
      hideSearchRecords();

      searchMessage.textContent =
        "該当する対象者記録は見つかりませんでした。";

      searchKeyInput.select();
      return;
    }

    searchMessage.textContent = "";

    hideSearchRecords();

    showSection(searchResult);
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

  function showSection(section) {
    section.hidden = false;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function hideSearchRecords() {
    searchResult.hidden = true;
    detail1.hidden = true;
    detail2.hidden = true;
    detail3.hidden = true;
    detail4.hidden = true;
  }
});