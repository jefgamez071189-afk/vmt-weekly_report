document.addEventListener("DOMContentLoaded", () => {

  // 1. TÍTULO QUE SE DESCIFRA DE IZQUIERDA A DERECHA (MATRIX)

  const titulo = document.getElementById("matrix-title");

  if (titulo) {
    const textoOriginal = "VMT Weekly Report";
    const glifos = "!<>-_/[]{}=+*^?#01";
    const sinAnimacion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!sinAnimacion) {
      titulo.setAttribute("aria-label", textoOriginal);
      titulo.textContent = "";

      const cajas = textoOriginal.split("").map((letra) => {
        const caja = document.createElement("span");
        caja.setAttribute("aria-hidden", "true");
        caja.style.display = "inline-block";
        caja.style.whiteSpace = "pre";
        caja.style.textAlign = "center";
        caja.textContent = letra;
        titulo.appendChild(caja);
        return caja;
      });

      cajas.forEach((caja) => {
        caja.style.width = caja.getBoundingClientRect().width + "px";
        caja.textContent = "";
      });

      const retraso = 850;
      const duracion = 1500;
      const inicio = performance.now() + retraso;
      const n = textoOriginal.length;

      const paso = (ahora) => {
        const k = Math.max(0, (ahora - inicio) / duracion);

        cajas.forEach((caja, i) => {
          const letra = textoOriginal[i];
          const hecho = k * (n + 4) - i;

          if (letra === " ") {
            caja.textContent = " ";
          } else if (hecho > 3) {
            caja.textContent = letra;
          } else if (hecho > 0) {
            caja.textContent = glifos[Math.floor(Math.random() * glifos.length)];
          } else {
            caja.textContent = "";
          }
        });

        if (k < 1) {
          requestAnimationFrame(paso);
        } else {
          cajas.forEach((caja, i) => { caja.textContent = textoOriginal[i]; });
        }
      };

      requestAnimationFrame(paso);
    }
  }

  // 2. CONTROL DEL BOTÓN DE ACCESO

  const openLink = document.getElementById("openLink");
  const openButtonText = document.getElementById("openButtonText");

  if (openLink && openButtonText) {

    openLink.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

      openLink.classList.add("is-loading");
      openButtonText.textContent = "Cargando...";
    });

    window.addEventListener("pageshow", function () {
      openLink.classList.remove("is-loading");
      openButtonText.textContent = "Abrir VMT Weekly Report";
    });

  }

});
