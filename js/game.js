const archiveButton = document.getElementById("archive-button");

if (archiveButton) {
  archiveButton.addEventListener("click", () => {
    const input = document.getElementById("archive-code");
    const errorMessage = document.getElementById("error-message");
    const code = input.value.trim();

    if (code === "815") {
      window.location.href = "06_archive.html";
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