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
  setupSubject017Authentication();
});

function setupSubject017Authentication() {
  const subjectRow = document.getElementById("subject-017-row");
  const authenticationSection = document.getElementById(
    "subject-authentication"
  );

  const passwordInput = document.getElementById("subject-password");
  const passwordButton = document.getElementById(
    "subject-password-button"
  );

  const passwordError = document.getElementById(
    "subject-password-error"
  );

  const subjectRecord = document.getElementById(
    "subject-017-record"
  );

  if (
    !subjectRow ||
    !authenticationSection ||
    !passwordInput ||
    !passwordButton ||
    !subjectRecord
  ) {
    return;
  }

  /*
   * No.017を選択したとき
   */
  subjectRow.addEventListener("click", openAuthentication);

  subjectRow.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openAuthentication();
    }
  });

  /*
   * 認証ボタン
   */
  passwordButton.addEventListener("click", checkPassword);

  /*
   * Enterキーでも認証
   */
  passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkPassword();
    }
  });

  /*
   * 入力中はエラーを消す
   */
  passwordInput.addEventListener("input", () => {
    if (passwordError) {
      passwordError.textContent = "";
    }
  });

  function openAuthentication() {
    authenticationSection.hidden = false;

    subjectRow.setAttribute("aria-expanded", "true");

    authenticationSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    window.setTimeout(() => {
      passwordInput.focus();
    }, 400);
  }

  function checkPassword() {
    /*
     * survey.jsで保存した生年月日
     * 例：20040815
     */
    const savedPassword = sessionStorage.getItem(
      "playerBirthDate"
    );

    /*
     * 数字以外を除去
     */
    const enteredPassword = passwordInput.value.replace(
      /\D/g,
      ""
    );

    if (!savedPassword) {
      if (passwordError) {
        passwordError.textContent =
          "本人確認情報を取得できません。アンケート回答後に、再度アクセスしてください。";
      }

      return;
    }

    if (enteredPassword.length !== 8) {
      if (passwordError) {
        passwordError.textContent =
          "パスワードを8桁の数字で入力してください。";
      }

      passwordInput.focus();
      return;
    }

    if (enteredPassword !== savedPassword) {
      if (passwordError) {
        passwordError.textContent =
          "パスワードが一致しません。";
      }

      passwordInput.select();
      return;
    }

    /*
     * 認証成功
     */
    if (passwordError) {
      passwordError.textContent = "";
    }

    authenticationSection.hidden = true;
    subjectRecord.hidden = false;

    /*
     * 同じタブ内では認証済みにする
     */
    sessionStorage.setItem(
      "subject017Authenticated",
      "true"
    );

    subjectRecord.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  /*
   * 一度認証済みなら、ページを再読み込みしても記録を表示
   */
  const authenticated = sessionStorage.getItem(
    "subject017Authenticated"
  );

  if (authenticated === "true") {
    subjectRecord.hidden = false;
  }
}