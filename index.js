const containerUm = document.querySelector(".container1") //Elemento da primeira grade de cartas
const containerDois = document.querySelector(".container2") //Elemento da segunda grade de cartas
const pontosP1 = document.getElementById('pontosP1') //Elemento da pontuação do jogador 1
const pontosP2 = document.getElementById('pontosP2') //ELemento da pontuação do jogador 2
const boxHabilidades = document.querySelectorAll(".box-habilidades") //Caixas de habilidades dos dois jogadores
const botoesP1 = boxHabilidades[0].querySelectorAll(".botao") //Botões de habilidade do jogador 1
const botoesP2 = boxHabilidades[1].querySelectorAll(".botao") //Botões de habilidade do jogador 2
const tempoP1 = document.getElementById('tempoP1') //Elemento do tempo do jogador 1
const tempoP2 = document.getElementById('tempoP2') //Elemento do tempo do jogador 2
const cartasViradas = [] //Lista vazia, onde serão armazenadas as cartas escolhidas pelo jogador

//Lista de frutas presentes nas cartas do jogo
const frutas = ["côco","cereja","pêssego","maçã","melancia","banana","limão","morango","abacate","pera", "uva", "abacaxi"]




//A função 'eventoDescricao' foi criada para adicionar um evento de mouseover para cada botão do jogo. Quando o mouse for colocado em cima do botão, a descrição desse botão vai receber uma classe que o deixará visível.
const eventoDescricao = ([a,...b], jogador, i=0) => {
  const descricoesP1 = boxHabilidades[0].querySelectorAll('.descricao')
  const descricoesP2 = boxHabilidades[1].querySelectorAll('.descricao')
  if(a){
    a.addEventListener('mouseover',()=>{
      jogador === 1? descricoesP1[i].classList.add('visivel') : descricoesP2[i].classList.add('visivel')
    })
    a.addEventListener('mouseout',()=>{
      jogador === 1? descricoesP1[i].classList.remove('visivel') : descricoesP2[i].classList.remove('visivel')
    })
    eventoDescricao(b,jogador,i+1)
  }
}
eventoDescricao(botoesP1,1)
eventoDescricao(botoesP2,2)

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

//A função 'carregarGrade' é responsável por criar a grade de cartas para os jogadores
const carregarGrade = (container) => {
  const duplica = [...frutas, ...frutas] //Lista com os pares de frutas
  //A função 'carregarGradeAux' recebe a lista com os pares de frutas randomizados,cria uma carta para cada item da lista e às coloca dentro do container específicado.
  const carregarGradeAux = ([a, ...b]) => {
    const carta = criarCartas(a)
    if (b.length == 0) {
      return container.appendChild(carta)
    } else {
      container.appendChild(carta)
      return carregarGradeAux(b)
    }
  }
  carregarGradeAux(duplica.sort(() => Math.random() - 0.7))
}
carregarGrade(containerUm)
carregarGrade(containerDois)

const cartas = document.querySelectorAll(".carta") //Todas as cartas do jogo
const cartas1 = containerUm.querySelectorAll(".carta") //Todas as cartas do jogador 1
const cartas2 = containerDois.querySelectorAll(".carta") //Todas as cartas do jogador 2

const primeiraJogada = (cartas, i = 0) => {
  if (i < cartas.length) {
    cartas[i].classList.add("pode-virar")
    return primeiraJogada(cartas, i + 1)
  }
}
primeiraJogada(cartas1)

const possuiClasse = (elemento, classe) => elemento.classList.contains(classe) //Checa se um elemento possui uma classe.
const adicionarClasse = (elemento, classe) => elemento.classList.add(classe) //Adiciona classe para o elemento.
const removerClasse = (elemento, classe) => elemento.classList.remove(classe) //Remove classe de um elemento.
//A função 'pausarClick' foi implementada para que os jogadores não consigam clicar em várias cartas em pouco tempo, evitando possíveis trapaças. Além disso, ela chama a si mesmo recursivamente, alterando o evento de click para cada carta.
const pausarClick = (cartas, ordem, i = 0) => {
if (i < cartas.length) {
cartas[i].style.pointerEvents = ordem
return pausarClick(cartas, ordem, i + 1)
}
}

const existeAtivado = ([a,...b]) => {
  if(a === undefined) return false
  else if(possuiClasse(a,"ativado")) return true
  return existeAtivado(b)
}

const removerClassePraCada = ([a, ...b], classe) => {
  if (a) {
    removerClasse(a,classe)
    removerClassePraCada(b, classe)
  }
}
const adicionarClassePraCada = ([a, ...b], classe) => {
  if (a) {
    adicionarClasse(a,classe)
    adicionarClassePraCada(b, classe)
  }
}


const verificarPontos = (jogador) => {
  if(jogador===1){
    if(!existeAtivado(botoesP1)){
      if(pontosP1.innerHTML > 1 && !possuiClasse(botoesP1[0],"ativado")){
        adicionarClasse(botoesP1[0],"botao-piscante-P1")
      }
      if(pontosP1.innerHTML > 2 && !possuiClasse(botoesP1[1],"ativado")){
        adicionarClasse(botoesP1[1],"botao-piscante-P1")
      }
      if(pontosP1.innerHTML > 3 && !possuiClasse(botoesP1[2],"ativado")){
        adicionarClasse(botoesP1[2],"botao-piscante-P1")
      }
      if(pontosP1.innerHTML > 3 && !possuiClasse(botoesP1[3],"ativado")){
        adicionarClasse(botoesP1[3],"botao-piscante-P1")
      }
    }
  }
  else if(jogador===2){
    if(!existeAtivado(botoesP2)){
      if(pontosP2.innerHTML > 1 && !possuiClasse(botoesP2[0],"ativado")){
        adicionarClasse(botoesP2[0],"botao-piscante-P2")
      }
      if(pontosP2.innerHTML > 2 && !possuiClasse(botoesP2[1],"ativado")){
        adicionarClasse(botoesP2[1],"botao-piscante-P2")
      }
      if(pontosP2.innerHTML > 3 && !possuiClasse(botoesP2[2],"ativado")){
        adicionarClasse(botoesP2[2],"botao-piscante-P2")
      }
      if(pontosP2.innerHTML > 3 && !possuiClasse(botoesP2[3],"ativado")){
        adicionarClasse(botoesP2[3],"botao-piscante-P2")
      }
    }
  }
}


const contagemP1 = (numero,velocidade=1000) => {
  const contador = document.getElementById("tempoP1")
  if(numero===0){
    if (cartasViradas.length == 1) {
      removerClasse(cartasViradas[0], "virar-carta")
      cartasViradas.length = 0
    }
    if(possuiClasse(botoesP1[0],"ativado")){
      adicionarClasse(containerDois, 'elemento-piscante')
      verificarPontos(2)
      containerUm.style.opacity = 0.4
      containerDois.style.opacity = 1
      setTimeout(() => {
        removerClasse(containerDois, "elemento-piscante")
        permitirVirada(cartas2)
        contagemP2(10,500)
      }, 2000)
      negarVirada(cartas1)
      contador.innerHTML = "0"
      removerClassePraCada(botoesP1,'ativado')
    }
    else if(possuiClasse(botoesP1[1],"ativadoAux")){
      adicionarClasse(containerUm, "elemento-piscante")
      setTimeout(() => {
        removerClasse(containerUm, "elemento-piscante")
        permitirVirada(cartas1)
        contagemP1(10)
      }, 2000)
      contador.innerHTML = "0"
      removerClasse(botoesP1[1],'ativadoAux')
    }
    else if (possuiClasse(botoesP1[3],"ativado")){
      adicionarClasse(containerDois, "elemento-piscante")
      verificarPontos(2)
      removerClassePraCada(botoesP1,'ativado')
      contador.innerHTML = "0"
      negarVirada(cartas1)
      containerUm.style.opacity = 0.4
      containerDois.style.opacity = 1
      setTimeout(()=>{
        removerClasse(containerDois, "elemento-piscante")
        permitirVirada(cartas2)
        contagemP2(10)
        const podemEmbaralhar = containerDois.querySelectorAll(".pode-virar")
        const removerCartas = ([a,...b]) => {
          if(a){
            containerDois.removeChild(a)
            removerCartas(b)
          }
        }
        removerCartas(podemEmbaralhar)
        const criarArray = ([a,...b]) => {
          if(a===undefined){
            return []
          }
          return [a,...criarArray(b)]
        }
        const cartasEmbaralhadas = criarArray(podemEmbaralhar).sort(()=>Math.random() - 0.7)
        const adicionarCartas = ([a,...b]) => {
          if(a){
            containerDois.appendChild(a)
            adicionarCartas(b)
          }
        }
        adicionarCartas(cartasEmbaralhadas)
      },2000)
    }
    else {
      negarVirada(cartas1)
      verificarPontos(2)
      adicionarClasse(containerDois, "elemento-piscante")
      containerUm.style.opacity = 0.4
      containerDois.style.opacity = 1
      setTimeout(() => {
        removerClasse(containerDois, "elemento-piscante")
        permitirVirada(cartas2)
        contagemP2(10)
      }, 2000)
      contador.innerHTML = "0"
      removerClassePraCada(botoesP1,'ativado')
      removerClassePraCada(botoesP1,'botao-piscante-P1') 
    }
  }
  else {
    verificarPontos(1)
    contador.innerHTML = numero
    setTimeout(() => {
      contagemP1(numero - 1,velocidade)
    }, velocidade)
  }
}

const contagemP2 = (numero,velocidade=1000) => {
  const contador = document.getElementById("tempoP2")
  if (numero===0){
    if (cartasViradas.length == 1) {
      removerClasse(cartasViradas[0], "virar-carta")
      cartasViradas.length = 0
    }
    if(possuiClasse(botoesP2[0],"ativado")){
      adicionarClasse(containerUm, 'elemento-piscante')
      verificarPontos(1)
      containerDois.style.opacity = 0.4
      containerUm.style.opacity = 1
      setTimeout(() => {
        removerClasse(containerUm, "elemento-piscante")
        permitirVirada(cartas1)
        contagemP1(10,500)
      }, 2000)
      negarVirada(cartas2)
      contador.innerHTML = "0"
      removerClassePraCada(botoesP2,'ativado')
      removerClassePraCada(botoesP2,'botao-piscante-P2')
    }
    else if (possuiClasse(botoesP2[1],"ativadoAux")){
      adicionarClasse(containerDois, "elemento-piscante")
      setTimeout(() => {
        removerClasse(containerDois, "elemento-piscante")
        permitirVirada(cartas2)
        contagemP2(10)
      }, 2000)
      contador.innerHTML = "0"
      removerClasse(botoesP2[1],'ativadoAux')
    }
    else if (possuiClasse(botoesP2[3],"ativado")){
      adicionarClasse(containerUm, "elemento-piscante")
      verificarPontos(1)
      removerClassePraCada(botoesP2,'ativado')
      contador.innerHTML = "0"
      negarVirada(cartas2)
      containerDois.style.opacity = 0.4
      containerUm.style.opacity = 1
      setTimeout(()=>{
        removerClasse(containerUm, "elemento-piscante")
        permitirVirada(cartas1)
        contagemP1(10)
        const podemEmbaralhar = containerUm.querySelectorAll(".pode-virar")
        const removerCartas = ([a,...b]) => {
          if(a){
            containerUm.removeChild(a)
            removerCartas(b)
          }
        }
        removerCartas(podemEmbaralhar)
        const criarArray = ([a,...b]) => {
          if(a===undefined){
            return []
          }
          return [a,...criarArray(b)]
        }
    
        const cartasEmbaralhadas = criarArray(podemEmbaralhar).sort(()=>Math.random() - 0.7)
        const adicionarCartas = ([a,...b]) => {
          if(a){
            containerUm.appendChild(a)
            adicionarCartas(b)
          }
        }
        adicionarCartas(cartasEmbaralhadas)
      },2000)
    }
    else {
      verificarPontos(1)
      adicionarClasse(containerUm, "elemento-piscante")
      containerDois.style.opacity = 0.4
      containerUm.style.opacity = 1
      setTimeout(() => {
        removerClasse(containerUm, "elemento-piscante")
        permitirVirada(cartas1)
        contagemP1(10)
      }, 2000)
      negarVirada(cartas2)
      contador.innerHTML = "0"
      if (cartasViradas.length == 1) {
        removerClasse(cartasViradas[0], "virar-carta")
        cartasViradas.length = 0
      }
      removerClassePraCada(botoesP2,'ativado')
      removerClassePraCada(botoesP2,'botao-piscante-P2')
    }
  }
  else{
    verificarPontos(2)
    contador.innerHTML = numero
    setTimeout(() => {
      contagemP2(numero - 1,velocidade)
    }, velocidade)
  }
}
contagemP1(10)

//A função 'virarCartaAux' funciona como um 'forEach', que para cada carta, adiciona um evento de click que chama a função 'virarCarta'.
const virarCartaAux = (cartas, i = 0) => {
  if (i < cartas.length) {
    cartas[i].addEventListener("click", () => {
    virarCarta(cartas[i])
  })
    return virarCartaAux(cartas, i + 1)
  }
}
virarCartaAux(cartas)
//A função 'virarCarta' é a que faz o jogo funcionar em cada grade de cartas, ela possui uma série de outras funções e condicionais que serão explicadas a seguir.


const virarCarta = (carta) => {
    if (carta.classList.contains("pode-virar")) {
    const puxarElemento = (elemPai, identificador) =>
    elemPai.querySelector(identificador) //Puxa algum elemento para ser utilizado.
    const puxarUrl = (elemento) =>
    getComputedStyle(elemento).getPropertyValue("background-image") //Guarda a url da imagem de um elemento


    //Se a carta que entrar na função como parâmetro já tiver a classe 'cartas-iguais', significa que ela já teve seu par resolvido, portanto, ela não pode ser virada novamente.
    if (possuiClasse(carta, "cartas-iguais")) return
    //Se a carta ainda não foi virada, ou seja, não possui a classe 'virar-carta' e a quantidade de cartas viradas for menor que dois, ela receberá a classe e será adicionada na lista de cartas viradas.
    else if (!possuiClasse(carta, "virar-carta") && cartasViradas.length < 2) {
      adicionarClasse(carta, "virar-carta")
      if(cartasViradas.length === 0){
        cartasViradas[0] = carta
      } else {
        cartasViradas[1] = carta
      }

      //Caso já existam duas cartas viradas, temos que checar se as cartas escolhidas são iguais ou não.
      if (cartasViradas.length === 2) {
        const escolhas = [cartasViradas[0], cartasViradas[1]] //Aqui vão ficar as cartas que o jogador escolheu.

        //Aqui vão ficar as frentes das cartas que o jogador escolheu.
        const frentes = [
        puxarElemento(escolhas[0], ".frente"),
        puxarElemento(escolhas[1], ".frente"),
        ]

        //Aqui vão ficar os versos das cartas que o jogador escolheu.
        const versos = [
        puxarElemento(escolhas[0], ".verso"),
        puxarElemento(escolhas[1], ".verso"),
        ]

        const urlFrutas = [puxarUrl(frentes[0]), puxarUrl(frentes[1])] //Essa lista vai guardar a url das imagens de cada frente.
        cartasViradas.length = 0 //Após a escolha de duas cartas, o número de viradas tem que voltar à zero.
        pausarClick(cartas, "none") //O clicks devem ser pausados na escolha de duas cartas.


        // O 'setTimeout' define um atraso, tudo o que estiver dentro de seu escopo só será executado após 0.7 segundos. Está sendo utilizado para que dê tempo de o jogador ver as cartas que escolheu antes de serem viradas novamente.
        setTimeout(() => {
          //Ambas as cartas irão perder a classe de virada e serão escondidas novamente,...
          removerClassePraCada(escolhas, "virar-carta")
          
          const igualdadesAntigasP1 = containerUm.querySelectorAll(".cartas-iguais")
          const igualdadesAntigasP2 = containerDois.querySelectorAll(".cartas-iguais")
          //mas caso as frutas sejam iguais, elas receberão a classe de 'cartas-iguais', que as deixará transparentes e travadas.
          if (urlFrutas[0] === urlFrutas[1]) {
            removerClassePraCada(escolhas,"pode-virar")
            adicionarClassePraCada(escolhas,"cartas-iguais")
            const igualdadesP1 = containerUm.querySelectorAll(".cartas-iguais")
            const igualdadesP2 = containerDois.querySelectorAll(".cartas-iguais")
            if (igualdadesP1.length == 20) {
              window.alert("Jogador 1 venceu")
              window.location.reload()
            }
            if (igualdadesP2.length == 20) {
              window.alert("Jogador 2 venceu")
              window.location.reload()
            }
            versos[0].style.display = "none"
            versos[1].style.display = "none"

            const igualdadesAtuaisP1 = containerUm.querySelectorAll(".cartas-iguais")
            const igualdadesAtuaisP2 = containerDois.querySelectorAll(".cartas-iguais")

            if(igualdadesAtuaisP1.length>igualdadesAntigasP1.length){
            pontosP1.innerHTML ++
            }
            else if(igualdadesAtuaisP2.length>igualdadesAntigasP2.length){
            pontosP2.innerHTML ++
            }
          }
          pausarClick(cartas, "all") //Retorna o evento de click nas cartas.
        }, 700)
      }
    }
  }
}

const permitirVirada = (cartas, i = 0) => {
  if (i < cartas.length) {
    adicionarClasse(cartas[i], "pode-virar")
    return permitirVirada(cartas, i + 1)
  }
}

const negarVirada = (cartas, i = 0) => {
  if (i < cartas.length) {
    removerClasse(cartas[i], "pode-virar")
    return negarVirada(cartas, i + 1)
  }
}

const repetirRodadaP1 = () => {
  if(pontosP1.innerHTML>2 && !containerUm.classList.contains('elemento-piscante')){
    pontosP1.innerHTML -= 3
    removerClassePraCada(botoesP1,'botao-piscante-P1')
    adicionarClasse(botoesP1[1],"ativado")
    adicionarClasse(botoesP1[1],"ativadoAux")
  }
}

const virarCartasP1 = () => {
  if(pontosP1.innerHTML>3 && !containerUm.classList.contains('elemento-piscante')){
    pontosP1.innerHTML -= 4
    removerClassePraCada(botoesP1,'botao-piscante-P1')
    adicionarClasse(botoesP1[2],"ativado")
    const podemVirar = containerUm.querySelectorAll('.pode-virar')
    adicionarClassePraCada(podemVirar,'virar-carta')
    setTimeout(()=>{
      removerClassePraCada(podemVirar,'virar-carta')
    },1500)
  }  
}

const acelerarTempoInimigoP1 = () => {
  if(pontosP1.innerHTML>1 && !containerUm.classList.contains('elemento-piscante')){
    pontosP1.innerHTML -= 2
    removerClassePraCada(botoesP1,'botao-piscante-P1')
    adicionarClasse(botoesP1[0],"ativado")
  }
}

const embaralharCartasOponenteP1 = () => {
  if(pontosP1.innerHTML>3 && !containerUm.classList.contains('elemento-piscante')){
    pontosP1.innerHTML -= 4
    removerClassePraCada(botoesP1,'botao-piscante-P1')
    adicionarClasse(botoesP1[3],"ativado")
  }
}

const repetirRodadaP2 = () => {
  if(pontosP2.innerHTML>2 && !containerDois.classList.contains('elemento-piscante')){
    pontosP2.innerHTML -= 3
    removerClassePraCada(botoesP2,'botao-piscante-P2')
    adicionarClasse(botoesP2[1],"ativado")
    adicionarClasse(botoesP2[1],"ativadoAux")
  }
}

const virarCartasP2 = () => {
  if(pontosP2.innerHTML>3 && !containerDois.classList.contains('elemento-piscante')){
    pontosP2.innerHTML -= 4
    adicionarClasse(botoesP2[2],"ativado")
    const podemVirar = containerDois.querySelectorAll('.pode-virar')
    adicionarClassePraCada(podemVirar,'virar-carta')
    setTimeout(()=>{
      removerClassePraCada(podemVirar,'virar-carta')
    },1500)
    removerClassePraCada(botoesP2,'botao-piscante-P2')
  }
}

const acelerarTempoInimigoP2 = () => {
  if(pontosP2.innerHTML>1 && !containerDois.classList.contains('elemento-piscante')){
    pontosP2.innerHTML -= 2
    adicionarClasse(botoesP2[0],"ativado")
    removerClassePraCada(botoesP2,'botao-piscante-P2')
  }
}

const embaralharOponenteP2 = () => {
  if(pontosP2.innerHTML>3 && !containerDois.classList.contains('elemento-piscante')){
    pontosP2.innerHTML -= 4
    removerClassePraCada(botoesP2,'botao-piscante-P2')
    adicionarClasse(botoesP2[3],"ativado")
  }
}