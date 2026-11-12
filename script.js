
document.addEventListener("DOMContentLoaded", () => {

  // =========================================================================
  // 1. ANIMACIÓN DE REVELADO DE IZQUIERDA A DERECHA (MATRIX)
  // =========================================================================

  const titulo = document.getElementById("matrix-title");

  if (titulo) {
    const textoOriginal = "VMT On Time";
    const glifos = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789#$&%@+?*";

    let posicionActual = 0;

    const intervalo = setInterval(() => {

      titulo.innerText = textoOriginal
        .split("")
        .map((letra, indice) => {

          // Letras ya descifradas definitivamente
          if (indice < Math.floor(posicionActual)) {
            return textoOriginal[indice];
          }

          // Mantener espacios en blanco
          if (textoOriginal[indice] === " ") {
            return " ";
          }

          // Letra actual con caracteres aleatorios
          if (indice === Math.floor(posicionActual)) {
            return glifos[Math.floor(Math.random() * glifos.length)];
          }

          // Letras todavía ocultas
          return " ";

        })
        .join("");

      // VELOCIDAD ORIGINAL
      posicionActual += 0.25;

      // Finalizar cuando se haya revelado todo el texto
      if (posicionActual >= textoOriginal.length) {
        titulo.innerText = textoOriginal;
        clearInterval(intervalo);
      }

    }, 40);

  }

  // =========================================================================
  // 2. CONTROL DEL BOTÓN DE ACCESO
  // =========================================================================

  const openLink = document.getElementById("openLink");
  const openButtonText = document.getElementById("openButtonText");

  if (openLink && openButtonText) {

    openLink.addEventListener("click", function () {
      openLink.classList.add("is-loading");
      openButtonText.textContent = "Cargando...";
    });

    window.addEventListener("pageshow", function () {
      openLink.classList.remove("is-loading");
      openButtonText.textContent = "Abrir VMT On Time";
    });

  }

});
