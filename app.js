const numeroLimite = 10;
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag,texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1});
}

function exibirMensagemInicial(tag,texto) {
    exibirTextoNaTela("h1", 'Jogo do número secreto');
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

/* Essa função troca o estado do botão de chute entre habilitado
 * e desabilitado, juntamente com o texto exibido dependendo da
 * ocasião. Isso é útil para impedir do jogador de fazer um chute
 * após já ter vencido o jogo
 */
function trocarEstadoDoBotaoDeChute() {
    const botaoChute = document.querySelector("#botao_chute");

    const atributoDisabilitado = botaoChute.getAttribute('disabled');

    if (atributoDisabilitado === "true") {
        botaoChute.removeAttribute("disabled");
        botaoChute.textContent = "Chutar";
    } else {
        botaoChute.setAttribute("disabled", "true");
        botaoChute.textContent = "Fim de jogo!";
    }
}

function verificarChute() {
    let chute = document.querySelector("input").value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Parabéns! Você acertou!!");

        trocarEstadoDoBotaoDeChute();

        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é menor. Tente novamente.");
        } else {
            exibirTextoNaTela( "p", "O número secreto é maior. Tente novamente.");
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * 10 + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
     if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
   }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    trocarEstadoDoBotaoDeChute();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true)
}

exibirMensagemInicial();
