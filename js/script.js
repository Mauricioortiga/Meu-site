/* ===== Carrossel: funciona para Galeria, Curiosidades e Projetos ===== */
document.querySelectorAll("[data-carrossel]").forEach(function (carrossel) {
  const slides = carrossel.querySelectorAll(".slide");
  const botaoAnterior = carrossel.querySelector("[data-anterior]");
  const botaoProximo = carrossel.querySelector("[data-proximo]");
  const contador = carrossel.parentElement.querySelector("[data-contador]");
  let atual = 0;

  function mostrar(indice) {
    // Volta ao início/fim quando passa do limite
    atual = (indice + slides.length) % slides.length;

    slides.forEach(function (slide, i) {
      slide.classList.toggle("ativo", i === atual);
    });

    if (contador) {
      contador.textContent = (atual + 1) + " de " + slides.length;
    }
  }

  botaoAnterior.addEventListener("click", function () { mostrar(atual - 1); });
  botaoProximo.addEventListener("click", function () { mostrar(atual + 1); });

  // Setas do teclado quando o foco está dentro do carrossel
  carrossel.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowLeft") mostrar(atual - 1);
    if (evento.key === "ArrowRight") mostrar(atual + 1);
  });

  // Arrastar o dedo no celular (esquerda = próximo, direita = anterior)
  let inicioX = null;
  carrossel.addEventListener("touchstart", function (e) { inicioX = e.touches[0].clientX; }, { passive: true });
  carrossel.addEventListener("touchend", function (e) {
    if (inicioX === null) return;
    const diferenca = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(diferenca) > 50) mostrar(diferenca < 0 ? atual + 1 : atual - 1);
    inicioX = null;
  }, { passive: true });

  mostrar(0);
});

/* ===== Menu mobile ===== */
const botaoMenu = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", function () {
  const aberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
});

// Fecha o menu ao clicar em um link
menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  });
});

/* ===== Destaca no menu a seção que está na tela ===== */
const linksMenu = menu.querySelectorAll("a");
const secoes = document.querySelectorAll("main section[id]");

const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      linksMenu.forEach(function (link) {
        link.classList.toggle("ativo", link.getAttribute("href") === "#" + entrada.target.id);
      });
    }
  });
}, { rootMargin: "-50% 0px -50% 0px" });

secoes.forEach(function (secao) { observador.observe(secao); });
