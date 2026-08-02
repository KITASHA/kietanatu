/* ==============================
   共通設定・ユーティリティ
================================ */

export const GAME_STORAGE_KEYS = Object.freeze({
  age: "playerAge",
  birthMonth: "playerBirthMonth",
  birthDay: "playerBirthDay",
  birthYear: "playerBirthYear",
  birthDate: "playerBirthDate",
  gender: "playerGender",
  surveyCompleted: "surveyCompleted"
});

const SURVEY_PAGE = "index.html";
const AUTH_EXCLUDED_PAGES = new Set([
  "index.html",
  "survey.html"
]);

/**
 * 現在開いているHTMLファイル名を取得する。
 * GitHub PagesのルートURLはindex.htmlとして扱う。
 */
export function getCurrentPage() {
  return window.location.pathname.split("/").pop() || SURVEY_PAGE;
}

/**
 * 全角数字を半角数字へ変換し、数字以外を取り除く。
 */
export function normalizeDigits(value, maxLength = Infinity) {
  return String(value ?? "")
    .replace(/[０-９]/g, (character) =>
      String.fromCharCode(character.charCodeAt(0) - 0xfee0)
    )
    .replace(/\D/g, "")
    .slice(0, maxLength);
}

/**
 * 保存済みの生年月日を8桁で取得する。
 * 旧sessionStorageの値がある場合はlocalStorageへ移行する。
 */
export function getStoredBirthDate() {
  const localValue = localStorage.getItem(
    GAME_STORAGE_KEYS.birthDate
  );

  const sessionValue = sessionStorage.getItem(
    GAME_STORAGE_KEYS.birthDate
  );

  const birthDate = normalizeDigits(
    localValue || sessionValue,
    8
  );

  if (birthDate.length !== 8) {
    return null;
  }

  if (!localValue && sessionValue) {
    localStorage.setItem(
      GAME_STORAGE_KEYS.birthDate,
      birthDate
    );
  }

  return birthDate;
}

/**
 * アンケート未回答なら開始ページへ戻す。
 * 戻した場合はfalseを返す。
 */
export function enforceSurveyCompletion() {
  const currentPage = getCurrentPage();

  if (AUTH_EXCLUDED_PAGES.has(currentPage)) {
    return true;
  }

  if (getStoredBirthDate()) {
    return true;
  }

  window.location.replace(SURVEY_PAGE);
  return false;
}

/**
 * ゲームで使用したブラウザ保存情報を削除する。
 */
export function clearGameStorage() {
  Object.values(GAME_STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}

/**
 * 指定した要素まで滑らかにスクロールする。
 */
export function scrollToElement(element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
