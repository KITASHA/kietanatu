document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("survey-form");
  const ageInput = document.getElementById("survey-age");
  const monthSelect = document.getElementById("survey-month");
  const daySelect = document.getElementById("survey-day");
  const errorMessage = document.getElementById("survey-error");

  if (!form || !ageInput || !monthSelect || !daySelect) {
    return;
  }

  /*
   * 月が変更されたら、選択できる日付を更新する
   */
  monthSelect.addEventListener("change", () => {
    updateDayOptions(monthSelect, daySelect);
  });

  /*
   * アンケート送信
   */
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const age = Number(ageInput.value);
    const month = Number(monthSelect.value);
    const day = Number(daySelect.value);

    const genderInput = document.querySelector(
      'input[name="gender"]:checked'
    );

    if (!Number.isInteger(age) || age < 10 || age > 99) {
      showError("年齢を正しく入力してください.");
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

    const gender = genderInput.value;

    /*
     * 現在の日付と年齢から生まれた年を計算する
     */
    const birthDate = calculateBirthDate(age, month, day);

    if (!birthDate) {
      showError("入力された誕生日を確認してください。");
      return;
    }

    /*
     * 例：
     * 2004年8月15日
     * パスワード形式：20040815
     */
    const birthDatePassword =
      String(birthDate.year) +
      String(birthDate.month).padStart(2, "0") +
      String(birthDate.day).padStart(2, "0");

    /*
     * ゲーム中だけブラウザに保存
     */
    sessionStorage.setItem("playerAge", String(age));
    sessionStorage.setItem("playerBirthMonth", String(month));
    sessionStorage.setItem("playerBirthDay", String(day));
    sessionStorage.setItem("playerBirthYear", String(birthDate.year));
    sessionStorage.setItem("playerBirthDate", birthDatePassword);
    sessionStorage.setItem("playerGender", gender);

    /*
     * イントロへ進む
     */

    window.location.href = "intro.html";
  });

  function showError(message) {
    if (errorMessage) {
      errorMessage.textContent = message;
    }
  }
});

/**
 * 月に応じた日付を生成する
 */
function updateDayOptions(monthSelect, daySelect) {
  const selectedMonth = Number(monthSelect.value);
  const previousDay = Number(daySelect.value);

  daySelect.innerHTML = '<option value="">日</option>';

  if (!selectedMonth) {
    return;
  }

  /*
   * 2月29日も選択可能にしておく
   */
  const daysInMonth = new Date(
    2024,
    selectedMonth,
    0
  ).getDate();

  for (let day = 1; day <= daysInMonth; day += 1) {
    const option = document.createElement("option");

    option.value = String(day);
    option.textContent = `${day}日`;

    if (day === previousDay) {
      option.selected = true;
    }

    daySelect.appendChild(option);
  }
}

/**
 * 年齢と誕生日から生年月日を計算する
 */
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

  /*
   * 日付として成立するか確認
   */
  const date = new Date(birthYear, month - 1, day);

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

