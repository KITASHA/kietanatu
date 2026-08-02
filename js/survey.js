/* ==============================
   プレイ前アンケート
================================ */

import {
  GAME_STORAGE_KEYS
} from "./common.js";

export function initSurvey() {
  const form = document.getElementById("survey-form");
  const ageInput = document.getElementById("survey-age");
  const monthSelect = document.getElementById("survey-month");
  const daySelect = document.getElementById("survey-day");
  const errorMessage = document.getElementById("survey-error");

  if (
    !form ||
    !ageInput ||
    !monthSelect ||
    !daySelect
  ) {
    return;
  }

  monthSelect.addEventListener("change", () => {
    updateDayOptions(monthSelect, daySelect);
    clearError();
  });

  ageInput.addEventListener("input", clearError);
  daySelect.addEventListener("change", clearError);

  document
    .querySelectorAll('input[name="gender"]')
    .forEach((input) => {
      input.addEventListener("change", clearError);
    });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const age = Number(ageInput.value);
    const month = Number(monthSelect.value);
    const day = Number(daySelect.value);
    const genderInput = document.querySelector(
      'input[name="gender"]:checked'
    );

    if (!Number.isInteger(age) || age < 10 || age > 99) {
      showError("年齢を正しく入力してください。");
      ageInput.focus();
      return;
    }

    if (!month || !day) {
      showError("誕生日を選択してください。");
      return;
    }

    if (!genderInput) {
      showError("性別を選択してください。");
      return;
    }

    const birthDate = calculateBirthDate(
      age,
      month,
      day
    );

    if (!birthDate) {
      showError("入力された誕生日を確認してください。");
      return;
    }

    const birthDatePassword = [
      birthDate.year,
      String(birthDate.month).padStart(2, "0"),
      String(birthDate.day).padStart(2, "0")
    ].join("");

    saveSurveyResult({
      age,
      month,
      day,
      birthYear: birthDate.year,
      birthDate: birthDatePassword,
      gender: genderInput.value
    });

    window.location.href = "intro.html";
  });

  function showError(message) {
    if (errorMessage) {
      errorMessage.textContent = message;
    }
  }

  function clearError() {
    if (errorMessage) {
      errorMessage.textContent = "";
    }
  }
}

function saveSurveyResult({
  age,
  month,
  day,
  birthYear,
  birthDate,
  gender
}) {
  const values = {
    [GAME_STORAGE_KEYS.age]: String(age),
    [GAME_STORAGE_KEYS.birthMonth]: String(month),
    [GAME_STORAGE_KEYS.birthDay]: String(day),
    [GAME_STORAGE_KEYS.birthYear]: String(birthYear),
    [GAME_STORAGE_KEYS.birthDate]: birthDate,
    [GAME_STORAGE_KEYS.gender]: gender,
    [GAME_STORAGE_KEYS.surveyCompleted]: "true"
  };

  Object.entries(values).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
}

function updateDayOptions(monthSelect, daySelect) {
  const selectedMonth = Number(monthSelect.value);
  const previousDay = Number(daySelect.value);

  daySelect.innerHTML = '<option value="">日</option>';

  if (!selectedMonth) {
    return;
  }

  // 2月29日を選択できるよう、うるう年を基準にする。
  const daysInMonth = new Date(
    2024,
    selectedMonth,
    0
  ).getDate();

  for (let day = 1; day <= daysInMonth; day += 1) {
    const option = document.createElement("option");

    option.value = String(day);
    option.textContent = `${day}日`;
    option.selected = day === previousDay;

    daySelect.appendChild(option);
  }
}

function calculateBirthDate(age, month, day) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const birthdayHasPassed =
    month < currentMonth ||
    (month === currentMonth && day <= currentDay);

  const birthYear = birthdayHasPassed
    ? currentYear - age
    : currentYear - age - 1;

  const date = new Date(
    birthYear,
    month - 1,
    day
  );

  const isValid =
    date.getFullYear() === birthYear &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isValid) {
    return null;
  }

  return {
    year: birthYear,
    month,
    day
  };
}
