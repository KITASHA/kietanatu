const archiveButton = document.getElementById("archive-button");

if (archiveButton) {
  archiveButton.addEventListener("click", () => {
    const input = document.getElementById("archive-code");
    const errorMessage = document.getElementById("error-message");
    const code = input.value.trim();

    if (code === "0815") {
      window.location.href = "archive.html";
      return;
    }

    errorMessage.textContent = "該当する資料は見つかりませんでした。";
  });
}

const nextButtons = document.querySelectorAll(".next-button");

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    target.classList.remove("hidden");

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    button.disabled = true;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  setupSubject017Search();
});

function setupSubject017Search() {
  const subjectRow = document.getElementById("subject-017-row");
  const searchSection = document.getElementById("subject-search");

  const searchKeyInput = document.getElementById(
    "subject-search-key"
  );

  const searchButton = document.getElementById(
    "subject-search-button"
  );

  const searchError = document.getElementById(
    "subject-search-error"
  );

  const subjectRecord = document.getElementById(
    "subject-017-record"
  );

  if (
    !subjectRow ||
    !searchSection ||
    !searchKeyInput ||
    !searchButton ||
    !subjectRecord
  ) {
    return;
  }

  subjectRow.addEventListener("click", openSearch);

  subjectRow.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openSearch();
    }
  });

  searchButton.addEventListener("click", searchSubject);

  searchKeyInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchSubject();
    }
  });

  searchKeyInput.addEventListener("input", () => {
    if (searchError) {
      searchError.textContent = "";
    }
  });

  function openSearch() {
    searchSection.hidden = false;

    subjectRow.setAttribute(
      "aria-expanded",
      "true"
    );

    searchSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    window.setTimeout(() => {
      searchKeyInput.focus();
    }, 400);
  }

  function searchSubject() {
    /*
     * survey.jsで保存した生年月日。
     * 例：20040815
     */
    const correctSearchKey = sessionStorage.getItem(
      "playerBirthDate"
    );

    const enteredSearchKey = searchKeyInput.value.replace(
      /\D/g,
      ""
    );

    if (!correctSearchKey) {
      showSearchError(
        "検索キー情報を取得できません。最初のページから再度アクセスしてください。"
      );

      return;
    }

    if (!enteredSearchKey) {
      showSearchError(
        "検索キーを入力してください。"
      );

      searchKeyInput.focus();
      return;
    }

    if (enteredSearchKey !== correctSearchKey) {
      showSearchError(
        "該当する対象者記録は確認できませんでした。"
      );

      searchKeyInput.select();
      return;
    }

    /*
     * 検索成功
     */
    if (searchError) {
      searchError.textContent = "";
    }

    searchSection.hidden = true;
    subjectRecord.hidden = false;

    sessionStorage.setItem(
      "subject017Searched",
      "true"
    );

    subjectRecord.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function showSearchError(message) {
    if (searchError) {
      searchError.textContent = message;
    }
  }

  /*
   * 再読み込み後も照合結果を表示する場合
   */
  const searched = sessionStorage.getItem(
    "subject017Searched"
  );

  if (searched === "true") {
    subjectRecord.hidden = false;
  }
}