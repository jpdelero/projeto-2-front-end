function ocultarTodos() {
  document.querySelectorAll('.exemplo1, .exemplo2, .exemplo3').forEach(div => {
    div.style.display = 'none';
  });
}

function openExemplo1() {
  ocultarTodos();
  document.querySelector('.exemplo1').style.display = 'block';
}

function openExemplo2() {
  ocultarTodos();
  document.querySelector('.exemplo2').style.display = 'block';
}

function openExemplo3() {
  ocultarTodos();
  document.querySelector('.exemplo3').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', ocultarTodos);

document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  // Coletar valores
  const valores = [];
  for (let i = 1; i <= 5; i++) {
    const valor = document.getElementById(`valor${i}`).value.trim();
    if (valor === "") {
      alert(`O campo Valor ${i} está vazio.`);
      return;
    }
    valores.push(valor);
  }

  // Criar conteúdo do TXT
  const conteudo = valores.map((v, i) => `Valor ${i + 1}: ${v}`).join("\n");

  // Criar e baixar o arquivo TXT
  const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "valores.txt";
  link.click();
});

let frutas = [];

function atualizarLista() {
  document.getElementById('listaFrutas').textContent = JSON.stringify(frutas);
}

function adicionarFruta() {
  const input = document.getElementById('frutaInput');
  const valor = input.value.trim();

  if (valor) {
    frutas.push(valor);
    input.value = "";
    atualizarLista();
  }
}

function metodo(acao) {
  if (acao === 'push') {
    const fruta = prompt("Digite uma fruta para adicionar no final:");
    if (fruta) frutas.push(fruta);
  } else if (acao === 'pop') {
    frutas.pop();
  } else if (acao === 'shift') {
    frutas.shift();
  } else if (acao === 'unshift') {
    const fruta = prompt("Digite uma fruta para adicionar no início:");
    if (fruta) frutas.unshift(fruta);
  }
  atualizarLista();
}

function verificarBanana() {
  const resultado = frutas.includes('banana')
    ? "🍌 Banana está no array!"
    : "🚫 Banana NÃO está no array.";
  document.getElementById('saida').textContent = resultado;
}

function mostrarIndex(fruta) {
  const index = frutas.indexOf(fruta);
  const resultado = index !== -1
    ? `A fruta '${fruta}' está na posição ${index}.`
    : `'${fruta}' não foi encontrada.`;
  document.getElementById('saida').textContent = resultado;
}

function mostrarJoin() {
  const resultado = "join(', '): " + frutas.join(', ');
  document.getElementById('saida').textContent = resultado;
}

function mostrarSlice() {
  const fatiado = frutas.slice(1, 3);
  document.getElementById('saida').textContent = "slice(1, 3): " + JSON.stringify(fatiado);
}

function fazerSplice() {
  frutas.splice(1, 1);
  atualizarLista();
  document.getElementById('saida').textContent = "splice(1, 1) aplicado.";
}

function mapMaiusculas() {
  const maiusculas = frutas.map(f => f.toUpperCase());
  document.getElementById('saida').textContent = "map (toUpperCase): " + JSON.stringify(maiusculas);
}

function filtrarGrandes() {
  const grandes = frutas.filter(f => f.length > 4);
  document.getElementById('saida').textContent = "filter (length > 4): " + JSON.stringify(grandes);
}

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.getElementById(tag);
  if (campo) {
    campo.innerHTML = texto;
    if (responsiveVoice.voiceSupport()) {
      responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
    }
  }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('tituloJogo', 'Jogo do número secreto');
    exibirTextoNaTela('mensagemJogo', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
  let chute = parseInt(document.getElementById('inputChute').value);

  if (chute === numeroSecreto) {
    exibirTextoNaTela('tituloJogo', 'Acertou!');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('mensagemJogo', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    let dica = chute > numeroSecreto
      ? 'O número secreto é menor'
      : 'O número secreto é maior';
    exibirTextoNaTela('mensagemJogo', dica);
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
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
    const chute = document.getElementById('inputChute');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}
