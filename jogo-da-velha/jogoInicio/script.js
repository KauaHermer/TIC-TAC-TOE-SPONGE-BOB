const textoPlayer = document.querySelector(".textoPlayer");
const modalVencedor = document.getElementById("modalVencedor")
const textModal = document.getElementById("text-modal")
const textSecond = document.getElementById("text-second")
const gifBob = document.getElementById("img-gifBob")
const gifPat = document.getElementById("img-gifPat")
const btnReiniciar = document.getElementById("btn-reiniciar")

let selecionado;
let player = '<img style="height: 150px; width: 150px; " src="../png/pngwing.com.png" alt="">';
let bob = '<img style="height: 150px; width: 150px; margin: auto; display: block;" src="../png/pngwing.com.png" alt="">';
let pat = '<img style="height: 150px; width: 150px; margin: auto; display: block;" src="../png/pratrick.png" alt="">';
let player1 = (localStorage.getItem('player1'))
let player2 = (localStorage.getItem('player2'))
let pontos = 0;


let posicao = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function iniciar() {
  selecionado = [];

  textoPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

  document.querySelectorAll(".tabuleiro button").forEach((item) => {
    item.innerHTML = "";
    item.style.backgroundColor = "";
    item.addEventListener("click", movimeno);
  });
}

iniciar();

function movimeno(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = player;
  e.target.removeEventListener("click", movimeno);
  selecionado[index] = player;
  e.target.style.backgroundColor = "#ffff07a2"

  if (player === bob) {
    e.target.style.backgroundColor = "#ffff07a2"
  } else if (player === pat) {
    e.target.style.backgroundColor = "#fe9888a9"
  }

  setTimeout(() => {
    check();
  }, [100]);

  player = player === pat ? bob : pat;
  textoPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function exibirModal(){
  modalVencedor.show()
}

function closeModal(){
  modalVencedor.close()
}

function check() {
  let ultimoJogador = player === bob ? pat : bob;
  
  const items = selecionado
    .map((item, i) => [item, i])
    .filter((item) => item[0] === ultimoJogador)
    .map((item) => item[1]);

  for (pos of posicao) {
    if (pos.every((item) => items.includes(item))) {
      if (ultimoJogador === bob) {
        let pontosP1 = parseInt(localStorage.getItem('pontosP1')) || 0;
        localStorage.setItem('pontosP1', pontosP1 + 2);
        textModal.innerHTML = `O ${player1} VENCEU`
        gifBob.style.display = "block"
        gifPat.style.display = "none"
        textSecond.innerHTML = `O JOGADOR ${player1} GANHOU 2 PONTOS`

      } else if (ultimoJogador === pat) {
        let pontosP2 = parseInt(localStorage.getItem('pontosP2')) || 0;
        localStorage.setItem('pontosP2', pontosP2 + 2);
        textModal.innerHTML = `O ${player2} VENCEU`
        gifBob.style.display = "none"
        gifPat.style.display = "block"
        textSecond.innerHTML = `O JOGADOR ${player2} GANHOU 2 PONTOS`
      }
      exibirModal()
      return
    }
  }

  if (selecionado.filter((item) => item).length === 9) {
    let pontosP1 = parseInt(localStorage.getItem('pontosP1')) || 0;
    let pontosP2 = parseInt(localStorage.getItem('pontosP2')) || 0;
    
    localStorage.setItem('pontosP1', pontosP1 + 1);
    localStorage.setItem('pontosP2', pontosP2 + 1);
    
    textModal.innerHTML = `O JOGADO DEU EMPATE`
    textSecond.innerHTML = `OS DOIS JOGADORES GANHARAM 1 PONTO`
    gifPat.style.display = "none"
    gifBob.style.display = "none"
    exibirModal()
    
  }
}

const audio = document.getElementById('Audio');
const btnAudio = document.getElementById('btn-audio');
const textButtonPlay = "<i class='bx bxs-volume-full'></i>";
const textButtonPause = "<i class='bx bxs-volume-mute' ></i>";

btnAudio.onclick = () => playPause();

const playPause = () => {
if (audio.paused) {
    audio.play();
    btnAudio.innerHTML = textButtonPlay;
} else {
    audio.pause();
    btnAudio.innerHTML = textButtonPause;
}
}
