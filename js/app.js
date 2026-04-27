let numeroMaximo = 100;
let numeroSecreto = parseInt(Math.random() * numeroMaximo + 1);
console.log("Número Secreto:", numeroSecreto); // Para testes

const campoDigitar = document.getElementById("digite");
const textoFeedback = document.getElementById("texto");
const botaoChutar = document.getElementById("chute-btn");
const botaoReiniciar = document.getElementById("reinicio-btn");

let tentativas = 1;

// Função que será executada quando clicar no botão
function verificarChute() {
    let chute = parseInt(campoDigitar.value);

    if (isNaN(chute)) {
        textoFeedback.innerText = "Por favor, digite um número válido!";
        return;
    }

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        textoFeedback.innerText = `Isso aí! Você descobriu o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativa}!`;
        
        // Bloqueia o botão após acertar
        botaoChutar.setAttribute('disabled', true);
    } else {
        if (chute > numeroSecreto) {
            textoFeedback.innerText = `O número secreto é menor que ${chute}`;
        } else {
            textoFeedback.innerText = `O número secreto é maior que ${chute}`;
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    campoDigitar.value = '';
    campoDigitar.focus();
}

// Escuta o clique do botão
botaoChutar.addEventListener("click", verificarChute);

// Lógica para reiniciar o jogo
botaoReiniciar.addEventListener("click", () => {
    location.reload(); // Forma mais simples de reiniciar tudo
});