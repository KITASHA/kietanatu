/* ==============================
   共通部品の読み込み
================================ */

const COMPONENTS = Object.freeze([
  {
    id: "header",
    path: "components/header.html"
  },
  {
    id: "footer",
    path: "components/footer.html"
  }
]);

export async function initIncludes() {
  await Promise.all(
    COMPONENTS.map(({ id, path }) =>
      loadComponent(id, path)
    )
  );
}

async function loadComponent(id, filePath) {
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  try {
    const response = await fetch(filePath, {
      cache: "no-cache"
    });

    if (!response.ok) {
      throw new Error(
        `${filePath}の読み込みに失敗しました（${response.status}）`
      );
    }

    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}
