(() => {
  const STORAGE_KEY = "playerBirthDate";
  const SURVEY_PAGE = "index.html";

  const currentPage =
    window.location.pathname.split("/").pop() || SURVEY_PAGE;

  /*
   * アンケートページ自身ではリダイレクトしない
   */
  if (currentPage === SURVEY_PAGE) {
    return;
  }

  const birthDate = localStorage
    .getItem(STORAGE_KEY)
    ?.replace(/\D/g, "");

  /*
   * 生年月日が8桁で保存されていなければ、
   * アンケートページへ戻す
   */
  if (!birthDate || birthDate.length !== 8) {
    window.location.replace(SURVEY_PAGE);
  }
})();