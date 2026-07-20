async function include(id, file) {
    const response = await fetch(file);

    if (!response.ok) {
        console.error(file + " の読み込みに失敗しました");
        return;
    }

    document.getElementById(id).innerHTML = await response.text();
}

window.addEventListener("DOMContentLoaded", async () => {

    if (document.getElementById("header")) {
        await include("header", "components/header.html");
    }

    if (document.getElementById("footer")) {
        await include("footer", "components/footer.html");
    }

    if (document.getElementById("sidebar")) {
        await include("sidebar", "components/sidebar.html");
    }

});