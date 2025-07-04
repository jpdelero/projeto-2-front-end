const conteudo = document.getElementById('conteudo');

function formE1() {
  conteudo.innerHTML = `
    <h1>Formulário de Valores</h1>
    <form id="formulario">
      <label for="valor1">Valor 1:</label>
      <input type="text" id="valor1" required><br>

      <label for="valor2">Valor 2:</label>
      <input type="text" id="valor2" required><br>

      <label for="valor3">Valor 3:</label>
      <input type="text" id="valor3" required><br>

      <label for="valor4">Valor 4:</label>
      <input type="text" id="valor4" required><br>

      <label for="valor5">Valor 5:</label>
      <input type="text" id="valor5" required><br>

      <button type="submit">Salvar em TXT</button>
    </form>
  `;

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
}

function listaE2() {
  conteudo.innerHTML = `
    <h1>Manipulando Frutas</h1>

    <input type="text" id="frutaInput" placeholder="Digite uma fruta" />
    <button onclick="adicionarFruta()">Adicionar</button>

    <h2>Frutas:</h2>
    <p id="listaFrutas">[ ]</p>

    <div class="botoes">
      <button onclick="metodo('push')">Push (Adicionar ao final)</button>
      <button onclick="metodo('pop')">Pop (Remover do final)</button>
      <button onclick="metodo('shift')">Shift (Remover do início)</button>
      <button onclick="metodo('unshift')">Unshift (Adicionar ao início)</button>
      <button onclick="verificarBanana()">Includes('banana')</button>
      <button onclick="mostrarIndex('uva')">IndexOf('uva')</button>
      <button onclick="mostrarJoin()">Join(', ')</button>
      <button onclick="mostrarSlice()">Slice(1, 3)</button>
      <button onclick="fazerSplice()">Splice(1, 1)</button>
      <button onclick="mapMaiusculas()">Map (MAIÚSCULAS)</button>
      <button onclick="filtrarGrandes()">Filter (nome > 4 letras)</button>
    </div>

    <pre id="saida"></pre>
  `;
}

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

function jogoE3() {
  conteudo.innerHTML = `
    <div class="container">
      <div class="container__conteudo">
        <div class="container__informacoes">
          <div class="container__texto">
            <h1 id="titulo-jogo">Adivinhe o <span class="container__texto-azul">número secreto</span></h1>
            <p id="mensagem-jogo">Escolha um número entre 1 e 10</p>
          </div>
          <input type="number" min="1" max="10" id="input-chute" class="container__input">
          <div class="chute container__botoes">
            <button id="botao-chutar">Chutar</button>
            <button id="reiniciar" disabled>Novo jogo</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("botao-chutar").onclick = verificarChute;
  document.getElementById("reiniciar").onclick = reiniciarJogo;
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  document.getElementById('reiniciar').disabled = true;
  document.getElementById('botao-chutar').disabled = false;
  exibirMensagemInicial();
}

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tagId, texto) {
  let campo = document.getElementById(tagId);
  campo.innerHTML = texto;
}

function exibirMensagemInicial() {
  exibirTextoNaTela('titulo-jogo', 'Jogo do número secreto');
  exibirTextoNaTela('mensagem-jogo', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
  let chute = parseInt(document.getElementById("input-chute").value);

  if (chute === numeroSecreto) {
    exibirTextoNaTela('titulo-jogo', 'Acertou!');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('mensagem-jogo', mensagemTentativas);

    document.getElementById('reiniciar').disabled = false;
    document.getElementById('botao-chutar').disabled = true;
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('mensagem-jogo', 'O número secreto é menor');
    } else {
      exibirTextoNaTela('mensagem-jogo', 'O número secreto é maior');
    }
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
  document.getElementById('input-chute').value = '';
  document.getElementById('input-chute').focus();
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  limparCampo();
  exibirMensagemInicial();
  document.getElementById('reiniciar').disabled = true;
  document.getElementById('botao-chutar').disabled = false;
}
