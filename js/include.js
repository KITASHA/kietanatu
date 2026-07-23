document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("header", "components/header.html");
  await loadComponent("footer", "components/footer.html");
});

async function loadComponent(id, filePath) {
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  try {
    const response = await fetch(`${filePath}?v=${Date.now()}`);

    if (!response.ok) {
      throw new Error(`${filePath}の読み込みに失敗しました`);
    }

    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}