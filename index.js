const pontos = document.getElementById("pontos")

const frutas = [
  "côco",
  "cereja",
  "pêssego",
  "maçã",
  "melancia",
  "banana",
  "limão",
  "morango",
  "pepino",
  "pera",
]

//A função 'criarCartas' serve para criar as cartas do jogo, como o próprio nome já diz. Dentro dela há a função 'criarElemento', que cria um elemento de acordo com a tag e a classe que for passada nos parâmetros. Depois de criar a carta, a frente e o verso são inseridos dentro dela e a carta é retornada.
const criarCartas = (fruta) => {
  const criarElemento = (tag, classe) => {
    const elemento = document.createElement(tag)
    elemento.className = classe
    return elemento
  }
  const carta = criarElemento("div", "carta")
  const frente = criarElemento("div", "frente face")
  const verso = criarElemento("div", "verso face")

  frente.style.backgroundImage = `url('./imagens/${fruta}.png')`
  frente.style.backgroundPosition = "center"
  carta.appendChild(frente)
  carta.appendChild(verso)

  return carta
}

const carregarGrade = (container) => {
  const duplica = [...frutas, ...frutas]
  const carregarGradeAux = ([a, ...b]) => {
    const carta = criarCartas(a)
    if (b.length == 0) {
      return container.appendChild(carta)
    } else {
      container.appendChild(carta)
      return carregarGradeAux(b)
    }
  }
  carregarGradeAux(duplica.sort(() => Math.random() - 0.2))
}
const containerUm = document.querySelector(".container1")
const containerDois = document.querySelector(".container2")
carregarGrade(containerUm)
carregarGrade(containerDois)

const cartas = document.querySelectorAll(".carta")
const cartasViradas = []

const virarCartaAux = (cartas, i = 0) => {
  if (i < cartas.length) {
    cartas[i].addEventListener("click", () => {
      virarCarta(cartas[i])
    })
    return virarCartaAux(cartas, i + 1)
  }
}
virarCartaAux(cartas)

const cartas1 = containerUm.querySelectorAll(".carta")
const cartas2 = containerDois.querySelectorAll(".carta")
cartas1.forEach((carta) => {
  carta.classList.add("pode-virar")
})

function contagemP1(numero) {
  const contador = document.getElementById("tempoP1")
  if (numero === 0 && cartasViradas.length < 2) {
    cartas1.forEach((carta) => {
      carta.classList.remove("pode-virar")
    })
    cartas2.forEach((carta) => {
      carta.classList.add("pode-virar")
    })
    contagemP2(10)
    contador.innerHTML = "0"
    cartasViradas[0].classList.remove('virar-carta')
    cartasViradas.length = 0
  }
 else if (numero === 0){
  cartas1.forEach((carta) => {
    carta.classList.remove("pode-virar")
  })
  cartas2.forEach((carta) => {
    carta.classList.add("pode-virar")
  })
  contagemP2(10)
  contador.innerHTML = "0"
  
 } else {
    contador.innerHTML = numero
    setTimeout(() => {
      contagemP1(numero - 1)
    }, 1000)
  }
}
function contagemP2(numero) {
  const contador = document.getElementById("tempoP2")

  if (numero === 0 && cartasViradas.length < 2) {
    cartas2.forEach((carta) => {
      carta.classList.remove("pode-virar")
    })
    cartas1.forEach((carta) => {
      carta.classList.add("pode-virar")
    })
    contagemP1(10)
    contador.innerHTML = "0"
    cartasViradas[0].classList.remove('virar-carta')
    cartasViradas.length = 0
  }
  else if (numero === 0){
    cartas2.forEach((carta) => {
      carta.classList.remove("pode-virar")
    })
    cartas1.forEach((carta) => {
      carta.classList.add("pode-virar")
    })
    contagemP2(10)
    contador.innerHTML = "0"
   } else {
    contador.innerHTML = numero
    setTimeout(() => {
      contagemP2(numero - 1)
    }, 1000)
  }
}

contagemP1(10)

const virarCarta = (carta) => {
  if (carta.classList.contains("pode-virar")) {
    const possuiClasse = (elemento, classe) =>
      elemento.classList.contains(classe)
    const adicionarClasse = (elemento, classe) => elemento.classList.add(classe)
    const removerClasse = (elemento, classe) =>
      elemento.classList.remove(classe)
    const puxarElemento = (elemPai, elemFilho) =>
      elemPai.querySelector(elemFilho)
    const puxarUrl = (elemento) =>
      getComputedStyle(elemento).getPropertyValue("background-image")
    const pausarClick = (cartas, ordem, i = 0) => {
      if (i < cartas.length) {
        cartas[i].style.pointerEvents = ordem
        return pausarClick(cartas, ordem, i + 1)
      }
    }

    if (possuiClasse(carta, "cartas-iguais")) return
    else if (!possuiClasse(carta, "virar-carta") && cartasViradas.length < 2) {
      adicionarClasse(carta, "virar-carta")
      cartasViradas.push(carta)

      if (cartasViradas.length === 2) {
        const escolhas = [cartasViradas[0], cartasViradas[1]]
        const frentes = [
          puxarElemento(escolhas[0], ".frente"),
          puxarElemento(escolhas[1], ".frente"),
        ]
        const versos = [
          escolhas[0].querySelector(".verso"),
          escolhas[1].querySelector(".verso"),
        ]
        const urlFrutas = [puxarUrl(frentes[0]), puxarUrl(frentes[1])]
        cartasViradas.length = 0
        pausarClick(cartas, "none")

        setTimeout(() => {
          removerClasse(escolhas[0], "virar-carta")
          removerClasse(escolhas[1], "virar-carta")

          if (urlFrutas[0] === urlFrutas[1]) {
            escolhas[0].classList.add("cartas-iguais")
            escolhas[1].classList.add("cartas-iguais")
            versos[0].style.display = "none"
            versos[1].style.display = "none"
            pontos.innerHTML++
          }
          const igualdades = document.querySelectorAll(".cartas-iguais")

          if (igualdades.length === 20) {
            window.alert("voa mlk")
            window.location.reload()
          }
          pausarClick(cartas, "all")
        }, 700)
      }
    }
  }
}
