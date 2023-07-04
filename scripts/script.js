/* Animação de surgimento dos elementos: */
window.sr = ScrollReveal({ reset: true });

ScrollReveal().reveal("div.service", {
  duration: 1800,
  delay: 200,
  easing: "ease-in-out",
});

ScrollReveal().reveal("section#aboutUs div#aboutLeft", {
  duration: 2000,
  distance: "100%",
  delay: 100,
  origin: "left",
  easing: "ease-in-out",
});

ScrollReveal().reveal("section#aboutUs div#aboutRight", {
  duration: 2000,
  distance: "100%",
  delay: 100,
  origin: "right",
  easing: "ease-in-out",
});

ScrollReveal().reveal("section#aboutUs > div:last-of-type", {
  duration: 1500,
  distance: "100px",
  easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
  interval: 64,
  origin: "bottom",
  delay: 100,
  viewFactor: 0.32,
});

ScrollReveal().reveal("section#contactUs > div", {
  duration: 1500,
  distance: "70px",
  easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
  interval: 64,
  origin: "bottom",
  delay: 200,
  viewFactor: 0.32,
});

ScrollReveal().reveal("section#contactUs > p", {
  duration: 1800,
  delay: 300,
  easing: "ease-in-out",
});

/* Troca de imagens da tela Home */
document.addEventListener("DOMContentLoaded", () => {
  let images = [
    "images/laserHairRemoval.jpg",
    "images/relaxationMassage.jpg",
    "images/acupuncture.jpg",
    "images/pilates.jpg",
    "images/faceCleasing.jpg",
    "images/others.jpg",
  ];
  const texts = [
    "Depilação a Laser",
    "Massagem Relaxante",
    "Acupuntura",
    "Pilates",
    "Limpeza de Pele",
    "E muito mais...",
  ];
  const imgElement = document.querySelector("div#leftDiv > img");
  const typingElement = document.querySelector("div#leftDiv > h1");
  let index = 0;
  let wait = 0;
  const delay = 75;

  // Pré-carregar todas as imagens
  for (let i = 0; i < images.length; i++) {
    let img = new Image();
    img.src = images[i];
  }

  async function typeWrite() {
    wait = delay * typingElement.textContent.length;
    for (let i = 0; i < typingElement.textContent.length; i++) {
      setTimeout(() => {
        typingElement.textContent = typingElement.textContent.slice(0, -1);
      }, delay * i);
    }

    setTimeout(() => {
      for (let i = 0; i < texts[index].length; i++) {
        setTimeout(() => {
          typingElement.textContent = texts[index].substring(0, i + 1);
        }, delay * i);
      }
    }, wait);
  }

  // Função para alterar a imagem com transição suave
  function changeImage() {
    typeWrite();
    imgElement.style.opacity = 0; // Começa com opacidade 0
    setTimeout(function () {
      imgElement.src = images[index];
      imgElement.style.opacity = 1; // Define a opacidade para 1 após a troca de imagem
    }, 500); // Espera 500ms antes de alterar a imagem
    index = (index + 1) % images.length;
  }

  // Iniciar a alteração da imagem a cada 5 segundos
  setInterval(changeImage, 5000);
});

/* Slide de imagens: */
let balls = document.querySelector("div#balls");
let imgQtd = document.querySelectorAll("div#images img");
let img = document.querySelector("img#imgSelected");
let back = document.querySelector("div#back");
let next = document.querySelector("div#next");
let pass = true;
let current = 0;

for (let i = 0; i < imgQtd.length; i++) {
  let div = document.createElement("div");
  div.id = i;
  balls.appendChild(div);
}
document.getElementById("0").classList.add("ballSelected");

let pos = document.querySelectorAll("div#balls div");

for (let i = 0; i < pos.length; i++) {
  pos[i].addEventListener("click", () => {
    current = pos[i].id;
    pass = false;
    slide();
  });
}

back.addEventListener("click", () => {
  pass = false;
  current--;
  slide();
});

next.addEventListener("click", () => {
  pass = false;
  current++;
  slide();
});

function slide() {
  if (current >= imgQtd.length) {
    current = 0;
  } else if (current < 0) {
    current = imgQtd.length - 1;
  }
  document.querySelector(".ballSelected").classList.remove("ballSelected");
  img.style.marginLeft = -img.offsetWidth * current + "px";
  document.getElementById(current).classList.add("ballSelected");
}

setInterval(() => {
  if (pass) {
    current++;
    slide();
  } else {
    pass = true;
  }
}, 5000);

/* Mostrar parágrafo dos procedimentos estéticos: */
const divAesthetic = document.querySelectorAll(
  "section#aesthetics > div:last-of-type > div"
);
const titleAesthetic = document.querySelectorAll(
  "section#aesthetics > div:last-of-type > div > h1"
);
let isMouseOver = [false, false, false, false, false, false];

divAesthetic.forEach(function (aesthetic, divIndex) {
  aesthetic.addEventListener("mouseover", () => {
    isMouseOver[divIndex] = true;

    if (window.innerWidth <= 1350) {
      /* Esconder os títulos quando a largura for menor que 1350px */
      titleAesthetic.forEach((title, titleIndex) => {
        if (divIndex != titleIndex && !isMouseOver[titleIndex]) {
          title.style.display = "none";
        }
      });
    }

    /* Mostrar os parágrafos */
    if (divIndex != 5) {
      setTimeout(() => {
        if (isMouseOver[divIndex]) {
          document.querySelector(
            `section#aesthetics > div:last-of-type > div:nth-of-type(${
              divIndex + 1
            }) p`
          ).style.display = "block";
        }
      }, 1000);
    } else {
      setTimeout(() => {
        if (isMouseOver[divIndex]) {
          document.querySelector(
            "section#aesthetics > div:last-of-type > div > ul"
          ).style.display = "block";
        }
      }, 1000);
    }
  });
});

divAesthetic.forEach(function (aesthetic, divIndex) {
  aesthetic.addEventListener("mouseout", () => {
    isMouseOver[divIndex] = false;

    /* Mosrar com delay os títulos quando a largura for menor que 1350px */
    if (window.innerWidth <= 1350) {
      titleAesthetic.forEach((title, titleIndex) => {
        setTimeout(() => {
          if (isMouseOver.every((el) => el === false)) {
            title.style.display = "block";
          } else if (isMouseOver[titleIndex]) {
            title.style.display = "block";
          }
        }, 1000);
      });
    }

    if (divIndex != 5) {
      document.querySelector(
        `section#aesthetics > div:last-of-type > div:nth-of-type(${
          divIndex + 1
        }) p`
      ).style.display = "none";
    } else {
      document.querySelector(
        "section#aesthetics > div:last-of-type > div > ul"
      ).style.display = "none";
    }
  });
});

/* Função de cópia de texto: */
const icons = document.querySelectorAll(
  "section#contactUs > div > div > p > i"
);

icons.forEach(function (icon, index) {
  icon.addEventListener("click", () => {
    let contentCopied = "";
    let boxMessage = "";
    if (index === 0) {
      contentCopied = "(11) 4241-5027";
      boxMessage = "numTel";
    } else if (index === 1) {
      contentCopied = "clinicaclaudiafilozi@gmail.com";
      boxMessage = "email";
    } else if (index === 2) {
      contentCopied = "(11) 93410-7391";
      boxMessage = "numWpp";
    }

    copyToClipboard(contentCopied);
    showBoxMessage(boxMessage);
  });
});

function copyToClipboard(copy) {
  var temporaryInput = document.createElement("input");
  temporaryInput.setAttribute("value", copy);
  document.body.appendChild(temporaryInput);
  temporaryInput.select();
  document.execCommand("copy");
  document.body.removeChild(temporaryInput);
}

function showBoxMessage(boxMessageId) {
  let boxMessage = document.getElementById(boxMessageId);
  boxMessage.style.display = "flex";
  setTimeout(function () {
    boxMessage.style.display = "none";
  }, 2000);
}
