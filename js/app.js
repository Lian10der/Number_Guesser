
let numeroMaximo = 100;
let numeroSecreto = parseInt(Math.random() * numeroMaximo + 1);
console.log("Número Secreto:", numeroSecreto); // Para testes

const campoDigitar = document.getElementById("digite");
const textoFeedback = document.getElementById("texto");
const botaoChutar = document.getElementById("chute-btn");
const botaoReiniciar = document.getElementById("reinicio-btn");

let tentativas = 1;

function verificarChute() {
    let chute = parseInt(campoDigitar.value);

    if (isNaN(chute)) {
        textoFeedback.innerText = "Por favor, digite um número válido!";
        return;
    }

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        textoFeedback.innerText = `Isso aí! Você descobriu o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativa}!`;
        
        botaoChutar.setAttribute('disabled', true);

        // --- NOVA LÓGICA DE REGISTRO ---
        setTimeout(() => {
            const querRegistrar = confirm("Parabéns! Deseja registrar seu recorde no Leaderboard?");
            
            if (querRegistrar) {
                const nome = prompt("Digite seu nome para o ranking:");
                
                if (nome && nome.trim() !== "") {
                    // Chama a função que está no seu banco.js
                    salvarPontuacao(nome.trim(), tentativas);
                } else {
                    alert("Registro cancelado: Nome não inserido.");
                }
            }
        }, 500); // Pequeno atraso para o jogador ler a mensagem de vitória antes do pop-up
        // -------------------------------

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
// Faz a tecla Enter funcionar como clique no botão
campoDigitar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        botaoChutar.click(); 
    }
});

// Lógica para reiniciar o jogo
botaoReiniciar.addEventListener("click", () => {
    location.reload(); // Forma mais simples de reiniciar tudo
});

// Chama o ranking assim que a página carregar
document.addEventListener('DOMContentLoaded', carregarLeaderboard);