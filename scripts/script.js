/* Animação de surgimento dos elementos: */
window.sr = ScrollReveal({ reset: true });

ScrollReveal().reveal("div.service", {
  duration: 1800,
  delay: 200,
  easing: "ease-in-out",
});

ScrollReveal().reveal("section#aesthetics > div:last-of-type > div", {
  duration: 1800,
  delay: 200,
  easing: "ease-in-out",
});

ScrollReveal().reveal("section#aboutUs div#aboutTop", {
  duration: 2000,
  distance: "100%",
  delay: 100,
  origin: "left",
  easing: "ease-in-out",
});

ScrollReveal().reveal("section#aboutUs div#aboutBottom", {
  duration: 2000,
  distance: "100%",
  delay: 100,
  origin: "right",
  easing: "ease-in-out",
});

ScrollReveal().reveal("section#aboutUs > div#aboutDoctor", {
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

/* Animações: */
const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

setInterval(() => {
  animateCSS("a#btnWpp", "tada");
}, 10000);

document.querySelector("footer > p").addEventListener("mouseover", () => {
  animateCSS("footer > p", "rubberBand");
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

  resizeImg();

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
    imgElement.style.opacity = 0;
    setTimeout(() => {
      imgElement.src = images[index];
      imgElement.style.opacity = 1;
      resizeImg();
    }, 500);
    index = (index + 1) % images.length;
  }

  // Iniciar a alteração da imagem a cada 5 segundos
  setInterval(changeImage, 5000);
});

/* Função para redimensionar imagem harmoniosamente: */
function resizeImg() {
  const leftDiv = document.getElementById("leftDiv");
  const imgElement = document.querySelector("div#leftDiv > img");

  if (
    leftDiv.clientWidth - imgElement.clientWidth >
    leftDiv.clientHeight - imgElement.clientHeight
  ) {
    imgElement.style.removeProperty("height");
    imgElement.style.width = "105%";
  } else {
    imgElement.style.removeProperty("width");
    imgElement.style.height = "105%";
  }
}

/* Abrir menu em dispositivos móveis: */
const navigation = document.querySelector("nav > ul");
navigation.addEventListener("click", () => {
  openMenu(false);
});

document
  .querySelector("header > div#openMenuBtn > i.fa-bars")
  .addEventListener("click", () => {
    openMenu(true);
  });

function openMenu(action) {
  if (window.innerWidth <= 800) {
    action ? (navigation.style.top = "0px") : (navigation.style.top = "-200px");

    if (action) {
      let newLi = document.createElement("li");
      let newLink = document.createElement("a");
      let newText = document.createTextNode("Início");

      newLink.appendChild(newText);
      newLink.href = "#start";
      newLi.appendChild(newLink);
      navigation.insertBefore(newLi, navigation.childNodes[0]);
    } else {
      navigation.removeChild(navigation.childNodes[0]);
    }
  }
}

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

/* Funções executadas ao iniciar ou redimensionar janela: */
window.addEventListener("load", () => {
  showParagraphs();

  if (window.innerWidth <= 800) {
    expandImg();
    serviceHover();
    expandDivAesthetic();
    centerContacts();
    changeElementsPlace();
    expandContact();
    updateSlidesWidth();
  }

  if (window.innerWidth <= 664) {
    removeBrAesthetic();
    removeBrAuthor();
  }

  if (window.innerWidth <= 390) {
    removeClinica();
  }
});

window.addEventListener("resize", () => {
  centerContacts();
  changeElementsPlace();
  updateSlidesWidth();

  if (window.innerWidth <= 800) {
    breakBtnWpp();
    expandImg();
    serviceHover();
    expandDivAesthetic();
    expandContact();
    removeClinica();
    removeBrAuthor();
  }

  if (window.innerWidth <= 664) {
    removeBrAesthetic();
  }
});

/* Expandir imagem de home com clique em dispositivos móveis: */
let execExpandImg = false;
function expandImg() {
  if (!execExpandImg) {
    execExpandImg = true;
    const homeImg = document.getElementById("leftDiv");
    let clickCount = 0;

    homeImg.addEventListener("click", () => {
      let flexQtd = 0;
      if (window.innerWidth <= 800 && window.innerWidth > 570) {
        flexQtd = 6;
      } else if (window.innerWidth <= 570) {
        flexQtd = 4.7;
      }

      if (window.innerWidth <= 800) {
        if (clickCount === 1) {
          homeImg.style.removeProperty("flex");
          clickCount = 0;
        } else {
          homeImg.style.flex = flexQtd;
          for (let i = 1; i < 20; i++) {
            setTimeout(() => {
              resizeImg();
            }, 60 * i);
          }
          clickCount++;
        }
      }
    });

    document.getElementById("rightDiv").addEventListener("click", () => {
      if (window.innerWidth <= 800 && clickCount === 1) {
        homeImg.style.removeProperty("flex");
        clickCount = 0;
      }
    });
  }
}

/* Hover com clique para dispositivos móveis em serviços: */
let execServiceHover = false;
function serviceHover() {
  if (!execServiceHover) {
    execServiceHover = true;

    const divService = document.querySelectorAll("div.service > div > div");
    let clickCountService = {
      div0: 0,
      div1: 0,
      div2: 0,
      div3: 0,
      div4: 0,
      div5: 0,
      div6: 0,
      div7: 0,
      div8: 0,
      div9: 0,
    };

    divService.forEach(function (service, divIndex) {
      service.addEventListener("click", () => {
        if (window.innerWidth <= 800) {
          const imgService = document.querySelector(
            `div.service:nth-of-type(${divIndex + 1}) > div > div > img`
          );
          const iconService = document.querySelector(
            `div.service:nth-of-type(${divIndex + 1}) > div > div > a`
          );
          let dynamicProperty = `div${divIndex}`;

          if (!clickCountService[dynamicProperty]) {
            imgService.style.transform = "scale(1.05)";
            imgService.style.filter = "blur(2px) brightness(0.6)";
            iconService.style.display = "inline";
            clickCountService[dynamicProperty]++;
          } else {
            imgService.style.removeProperty("transform");
            imgService.style.removeProperty("filter");
            iconService.style.removeProperty("display");
            clickCountService[dynamicProperty] = 0;
          }
        }
      });
    });
  }
}

/* Função para remover a palavra Cliníca do início: */
let removedClinica = false;
function removeClinica() {
  const h2 = document.querySelector("div#rightDiv > h2");

  if (!removedClinica && window.innerWidth <= 380) {
    h2.textContent = "Saúde, estética e bem-estar";
    removedClinica = true;
  } else if (removedClinica && window.innerWidth > 380) {
    h2.textContent = "Clínica de saúde, estética e bem-estar";
    removedClinica = false;
  }
}

/* Funções da seção de procedimentos estéticos: */
const divAesthetic = document.querySelectorAll(
  "section#aesthetics > div:last-of-type > div"
);

/* Expandir divAesthetic com clique em dispositivos móveis: */
let execExpandDivAesthetic = false;
function expandDivAesthetic() {
  if (!execExpandDivAesthetic) {
    execExpandDivAesthetic = true;
    let clickCount = {
      div0: 0,
      div1: 0,
      div2: 0,
      div3: 0,
      div4: 0,
      div5: 0,
    };

    divAesthetic.forEach(function (aesthetic, divIndex) {
      aesthetic.addEventListener("click", () => {
        if (window.innerWidth <= 800) {
          let dynamicProperty = `div${divIndex}`;

          Object.entries(clickCount).forEach(([key], index) => {
            if (key != dynamicProperty) {
              document
                .querySelector(
                  `section#aesthetics > div:last-of-type > div:nth-of-type(${
                    index + 1
                  })`
                )
                .style.removeProperty("flex");

              if (window.innerWidth <= 664) {
                if (index != 5) {
                  document
                    .querySelector(
                      `section#aesthetics > div:last-of-type > div:nth-of-type(${
                        index + 1
                      }) p`
                    )
                    .style.removeProperty("display");
                } else {
                  document
                    .querySelector(
                      "section#aesthetics > div:last-of-type > div ul"
                    )
                    .style.removeProperty("display");
                }
              }

              clickCount[key] = 0;
            }
          });

          if (!clickCount[dynamicProperty]) {
            aesthetic.style.flex = 1.5;
            clickCount[dynamicProperty]++;

            if (window.innerWidth <= 664) {
              if (divIndex != 5) {
                setTimeout(() => {
                  document.querySelector(
                    `section#aesthetics > div:last-of-type > div:nth-of-type(${
                      divIndex + 1
                    }) p`
                  ).style.display = "block";
                }, 1000);
              } else {
                setTimeout(() => {
                  document.querySelector(
                    "section#aesthetics > div:last-of-type > div ul"
                  ).style.display = "block";
                }, 1000);
              }
            }
          } else {
            aesthetic.style.removeProperty("flex");
            clickCount[dynamicProperty] = 0;

            if (divIndex != 5) {
              document
                .querySelector(
                  `section#aesthetics > div:last-of-type > div:nth-of-type(${
                    divIndex + 1
                  }) p`
                )
                .style.removeProperty("display");
            } else {
              document
                .querySelector("section#aesthetics > div:last-of-type > div ul")
                .style.removeProperty("display");
            }
          }
        }
      });
    });
  }
}

/* Mostrar parágrafo dos procedimentos estéticos: */
function showParagraphs() {
  const titleAesthetic = document.querySelectorAll(
    "section#aesthetics > div:last-of-type > div > h1"
  );
  let isMouseOver = [false, false, false, false, false, false];

  divAesthetic.forEach(function (aesthetic, divIndex) {
    aesthetic.addEventListener("mouseover", () => {
      if (window.innerWidth > 800) {
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
                "section#aesthetics > div:last-of-type > div ul"
              ).style.display = "block";
            }
          }, 1000);
        }
      }
    });
  });

  divAesthetic.forEach(function (aesthetic, divIndex) {
    aesthetic.addEventListener("mouseout", () => {
      if (window.innerWidth > 800) {
        isMouseOver[divIndex] = false;

        /* Mostrar com delay os títulos quando a largura for menor que 1350px */
        if (window.innerWidth <= 1350) {
          titleAesthetic.forEach((title, titleIndex) => {
            setTimeout(() => {
              if (isMouseOver.every((el) => el === false)) {
                title.style.removeProperty("display");
              } else if (isMouseOver[titleIndex]) {
                title.style.removeProperty("display");
              }
            }, 1000);
          });
        }

        if (divIndex != 5) {
          document
            .querySelector(
              `section#aesthetics > div:last-of-type > div:nth-of-type(${
                divIndex + 1
              }) p`
            )
            .style.removeProperty("display");
        } else {
          document
            .querySelector("section#aesthetics > div:last-of-type > div ul")
            .style.removeProperty("display");
        }
      }
    });
  });
}

/* Remover quebra de linha da seção de procedimentos estéticos: */
let removed = false;
function removeBrAesthetic() {
  const title2 = document.querySelector(
    "section#aesthetics > div:last-of-type > div:nth-child(2) > h1"
  );
  const title3 = document.querySelector(
    "section#aesthetics > div:last-of-type > div:nth-child(5) > h1"
  );

  if (!removed && window.innerWidth <= 664) {
    title2.querySelector("br").remove();
    title3.querySelector("br").remove();

    removed = true;
  } else if (removed && window.innerWidth > 664) {
    title2.innerHTML = "Preenchimento <br> Labial";
    title3.innerHTML = "Gordura <br> Localizada";

    removed = false;
  }
}

/* Trocar texto e logo de lugar: */
function changeElementsPlace() {
  const aboutTop = document.getElementById("aboutTop");
  const aboutBottom = document.getElementById("aboutBottom");
  const text = document.getElementById("aboutTxt");
  const logo = document.getElementById("aboutLogo");
  const logoTitle = document.querySelector("div#aboutLogo h1");
  const logoParagraph = document.getElementById("logoParagraph");
  const video = document.getElementById("videoContainer");
  const slide = document.getElementById("slide");
  const cornerTop = document.getElementById("cornerTop");
  const newDiv1 = document.createElement("div");
  const newDiv2 = document.createElement("div");
  newDiv1.id = "newDiv1";
  newDiv2.id = "newDiv2";

  if (aboutTop.contains(logo) && window.innerWidth <= 800) {
    text.remove();
    slide.insertAdjacentElement("afterend", text);

    logo.remove();
    video.insertAdjacentElement("beforebegin", logo);
    logoTitle.textContent = "Claudia Filozi";
    aboutBottom.appendChild(logoParagraph);

    aboutBottom.appendChild(cornerTop);

    newDiv1.appendChild(logo);
    newDiv1.appendChild(video);
    newDiv2.appendChild(logoParagraph);

    aboutBottom.insertBefore(newDiv2, aboutBottom.firstElementChild);
    aboutBottom.insertBefore(newDiv1, aboutBottom.firstElementChild);
  } else if (aboutTop.contains(text) && window.innerWidth > 800) {
    text.remove();
    video.insertAdjacentElement("beforebegin", text);

    logo.remove();
    slide.insertAdjacentElement("afterend", logo);
    logoTitle.textContent = "Clínica Claudia Filozi";
    document.querySelector("div#aboutLogo > div").appendChild(logoParagraph);

    document.getElementById("newDiv1").remove();
    document.getElementById("newDiv2").remove();

    aboutTop.insertBefore(cornerTop, aboutTop.firstElementChild);

    aboutBottom.insertBefore(video, aboutBottom.firstElementChild);
    aboutBottom.insertBefore(text, video);
  }
}

/* Atualizar largura do slide de fotos proporcionalmente: */
function updateSlidesWidth() {
  const slide = document.getElementById("slide");

  if (window.innerWidth <= 800) {
    const currentWidth = slide.clientWidth;
    const proportion = 850 / 638; // Largura original dividida pela altura original
    const newHeight = currentWidth / proportion + 10; // Calcula a nova altura proporcional

    slide.style.height = newHeight + "px"; // Atualiza a altura da div
  } else if (window.innerWidth > 800) {
    slide.style.removeProperty("width");
    slide.style.removeProperty("height");
  }
}

/* Expandir meios de contato com clique em dispositivos móveis: */
let execExpandContact = false;
function expandContact() {
  if (!execExpandContact) {
    execExpandContact = true;
    const divContact = document.querySelectorAll(
      "section#contactUs > div > div.newDiv"
    );
    let clickCount = {
      div0: 0,
      div1: 0,
      div2: 0,
    };

    divContact.forEach(function (contact, divIndex) {
      contact.addEventListener("click", () => {
        if (window.innerWidth <= 800) {
          const dynamicProperty = `div${divIndex}`;
          const contactDiv = contact.querySelector("div");

          Object.entries(clickCount).forEach(([key], index) => {
            const ctc = document.querySelector(
              `section#contactUs > div > div:nth-of-type(${index + 1}) > div`
            );
            if (key != dynamicProperty) {
              ctc.style.removeProperty("transform");

              clickCount[key] = 0;
            }
          });

          if (!clickCount[dynamicProperty]) {
            animateCSS(
              `section#contactUs > div > div:nth-child(${divIndex + 1}) a `,
              "bounce"
            );
            window.innerWidth > 395
              ? (contactDiv.style.transform = "translateX(20px)")
              : (contactDiv.style.transform = "translateX(10px)");
            clickCount[dynamicProperty]++;
          } else {
            contactDiv.style.removeProperty("transform");
            clickCount[dynamicProperty] = 0;
          }
        }
      });
    });
  }
}

/* Centralizar meios de contato: */
function centerContacts() {
  const removeDivs = document.querySelectorAll("section#contactUs div.newDiv");

  if (removeDivs.length == 0 && window.innerWidth <= 800) {
    let divsContact = document.querySelectorAll(
      "section#contactUs > div > div"
    );
    divsContact.forEach(function (contact) {
      let newDiv = document.createElement("div");

      newDiv.className = "newDiv";
      newDiv.style.display = "flex";
      newDiv.style.alignItems = "center";
      newDiv.style.justifyContent = "center";
      newDiv.style.width = "100%";
      newDiv.style.padding = 0;
      newDiv.style.margin = 0;

      contact.parentNode.insertBefore(newDiv, contact);
      newDiv.appendChild(contact);
    });
  } else if (removeDivs.length > 0 && window.innerWidth > 800) {
    removeDivs.forEach((div) => div.replaceWith(...div.childNodes));
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
      animateCSS("a#btnWpp", "flip");
      exec = true;
    } else if (exec && distanceToBottom > 40) {
      animateCSS("a#btnWpp", "flip");
      btnWpp.style.removeProperty("bottom");
      exec = false;
    }
  }
}

/* Função para consertar texto sobre o autor do site: */
let removedBrAuthor = false;
function removeBrAuthor() {
  const author = document.querySelector("footer > p");

  if (!removedBrAuthor && window.innerWidth <= 570) {
    author.innerHTML =
      'por <a href="https://thiagomes07.github.io/myPortfolio/" target="_blank" title="Desenvolvedor deste site">Thiago Gomes</a>';
    removedBrAuthor = true;
  } else if (removedBrAuthor && window.innerWidth > 570) {
    author.innerHTML =
      'por<br><a href="https://thiagomes07.github.io/myPortfolio/" target="_blank" title="Desenvolvedor deste site">Thiago Gomes</a>';
    removedBrAuthor = false;
  }
}

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
