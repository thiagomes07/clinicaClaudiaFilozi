/* Ao clicar na logo, redirecionar o usuário à página principal: */
document.getElementById("logoHeader").addEventListener("click", () => {
  window.location.href = "../index.html";
});

window.addEventListener("load", () => {
  replaceFooter();

  window.innerWidth <= 664 && removeBrAuthor();
});

window.addEventListener("resize", () => {
  replaceFooter();

  window.innerWidth <= 800 && removeBrAuthor();
});

/* Função para manter sempre o rodapé no fim da página: */
function replaceFooter() {
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const header = document.querySelector("header");

  if (
    main.clientHeight + footer.clientHeight + header.clientHeight <=
    window.innerHeight
  ) {
    document.body.style.height = "100vh";
    main.style.flex = 1;
  } else {
    document.body.style.removeProperty("height");
    main.style.removeProperty("flex");
  }
}

/* Função para consertar texto sobre o autor do site: */
let removedBrAuthor = false;
function removeBrAuthor() {
  const author = document.querySelector("footer > p");

  if (!removedBrAuthor && window.innerWidth <= 700) {
    author.innerHTML =
      'por <a href="https://thiagomes07.github.io/myPortfolio/" target="_blank" title="Desenvolvedor deste site">Thiago Gomes</a>';
    removedBrAuthor = true;
  } else if (removedBrAuthor && window.innerWidth > 700) {
    author.innerHTML =
      'por<br><a href="https://thiagomes07.github.io/myPortfolio/" target="_blank" title="Desenvolvedor deste site">Thiago Gomes</a>';
    removedBrAuthor = false;
  }
}

/* Função para o botão WPP não ir até o final da página: */
window.addEventListener("scroll", breakBtnWpp);

let exec = false;
function breakBtnWpp() {
  if (true) {
    const btnWpp = document.getElementById("btnWpp");
    const windowHeight = window.innerHeight;
    const pageHeight = document.body.scrollHeight;
    const scrollPosition = window.scrollY;

    const distanceToBottom = pageHeight - (scrollPosition + windowHeight);
    if (!exec && distanceToBottom <= 40) {
      btnWpp.style.bottom = "80px";
      exec = true;
    } else if (exec && distanceToBottom > 40) {
      btnWpp.style.removeProperty("bottom");
      exec = false;
    }
  }
}
