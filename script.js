/* ==========================================================
   Portal do Estudante - Script principal
   Tarefa 08 - Web Design (Facens)
   Aula: JS - Sintaxe, Variáveis e Estruturas
   ========================================================== */

// Mensagem no console para confirmar que o script externo foi carregado
console.log("Script carregado");

/* ==========================================================
   1. Dark mode (modo escuro)
   ========================================================== */

// Pega o botão de modo escuro pelo id
const botaoDark = document.getElementById("toggle-dark");

// Ao clicar no botão, liga ou desliga o modo escuro
botaoDark.addEventListener("click", function () {
    // toggle: adiciona a classe "dark" no body se não tiver, ou remove se já tiver
    document.body.classList.toggle("dark");

    // Verifica se o body está com a classe "dark" (resultado true ou false)
    const modoEscuroAtivo = document.body.classList.contains("dark");

    // Operador ternário: se o modo escuro estiver ativo, o botão oferece voltar ao claro
    botaoDark.textContent = modoEscuroAtivo ? "Modo claro" : "Modo escuro";
});

/* ==========================================================
   2. Botão voltar ao topo
   ========================================================== */

// Pega o botão de voltar ao topo pelo id
const botaoTopo = document.getElementById("back-to-top");

// Toda vez que a página é rolada, verifica a posição da rolagem
window.addEventListener("scroll", function () {
    // window.scrollY = quantos pixels a página já foi rolada para baixo
    if (window.scrollY > 200) {
        // Passou de 200px: mostra o botão (classe .visivel do CSS)
        botaoTopo.classList.add("visivel");
    } else {
        // Está perto do topo: esconde o botão
        botaoTopo.classList.remove("visivel");
    }
});

// Ao clicar no botão, rola a página de volta ao topo com animação suave
botaoTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==========================================================
   3. Efeito de digitação (typewriter)
   ========================================================== */

// Pega o span do título do banner onde o texto será "digitado"
const elementoDigitacao = document.getElementById("typewriter");

// Texto que será escrito letra por letra
const textoDigitacao = "Bem-vindo ao Portal do Estudante!";

// Posição da letra atual (começa na primeira, índice 0)
let index = 0;

// Velocidade da digitação em milissegundos (tempo entre uma letra e outra)
const velocidade = 100;

// Função que escreve uma letra por vez
function digitar() {
    // Enquanto ainda houver letras para escrever...
    if (index < textoDigitacao.length) {
        // charAt pega a letra na posição atual e ela é adicionada ao texto do span
        elementoDigitacao.textContent += textoDigitacao.charAt(index);

        // Avança para a próxima letra
        index++;

        // Chama a própria função de novo depois do tempo definido em "velocidade"
        setTimeout(digitar, velocidade);
    }
}

// Inicia o efeito de digitação assim que o script é carregado
digitar();

/* ==========================================================
   4. Modal (pop-up)
   ========================================================== */

// Pega o modal, o botão que abre e o botão que fecha
const modal = document.getElementById("modal");
const botaoAbrirModal = document.getElementById("open-modal");
const botaoFecharModal = document.getElementById("close-modal");

// Ao clicar em "Saiba mais", adiciona a classe .aberto e o modal aparece
botaoAbrirModal.addEventListener("click", function () {
    modal.classList.add("aberto");
});

// Ao clicar no "X", remove a classe .aberto e o modal some
botaoFecharModal.addEventListener("click", function () {
    modal.classList.remove("aberto");
});

// Ao clicar no fundo escuro (fora da caixa branca), o modal também fecha
modal.addEventListener("click", function (e) {
    // e.target é o elemento que recebeu o clique;
    // se for o próprio fundo do modal (e não a caixa de dentro), fecha
    if (e.target === modal) {
        modal.classList.remove("aberto");
    }
});

/* ==========================================================
   5. Calculadora de média
   ========================================================== */

// Pega os campos de nota, o botão e o parágrafo do resultado
const campoNota1 = document.getElementById("nota1");
const campoNota2 = document.getElementById("nota2");
const botaoCalcular = document.getElementById("btn-calcular");
const resultadoMedia = document.getElementById("resultado-media");

// Função que recebe as duas notas e devolve (return) a média
function calcularMedia(nota1, nota2) {
    return (nota1 + nota2) / 2;
}

// Arrow function que recebe a média e devolve a situação do aluno
const classificar = (media) => {
    if (media >= 9) {
        return "Excelente";
    } else if (media >= 7) {
        return "Aprovado";
    } else {
        return "Reprovado";
    }
};

// Ao clicar em "Calcular", lê as notas, calcula e mostra o resultado
botaoCalcular.addEventListener("click", function () {
    // Remove as cores do cálculo anterior antes de aplicar a nova
    resultadoMedia.classList.remove("excelente", "aprovado", "reprovado", "aviso");

    // Se algum campo estiver vazio (operador lógico ||), mostra um aviso e para
    if (campoNota1.value === "" || campoNota2.value === "") {
        resultadoMedia.textContent = "Preencha as duas notas para calcular a média.";
        resultadoMedia.classList.add("aviso");
        return; // sai da função sem calcular
    }

    // .value sempre vem como texto (string); Number() converte para número
    const nota1 = Number(campoNota1.value);
    const nota2 = Number(campoNota2.value);

    // Mostra no console o tipo do dado antes e depois da conversão
    console.log(typeof campoNota1.value, typeof nota1); // "string" "number"

    // Se alguma nota estiver fora do intervalo de 0 a 10, mostra um aviso e para
    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
        resultadoMedia.textContent = "As notas devem estar entre 0 e 10.";
        resultadoMedia.classList.add("aviso");
        return;
    }

    // Chama as funções: calcula a média e descobre a situação
    const media = calcularMedia(nota1, nota2);
    const situacao = classificar(media);

    // Mostra o resultado com template string (toFixed(2) deixa 2 casas decimais)
    resultadoMedia.textContent = `Média: ${media.toFixed(2)} - ${situacao}`;

    // Muda a cor do resultado de acordo com a situação
    if (situacao === "Excelente") {
        resultadoMedia.classList.add("excelente");
    } else if (situacao === "Aprovado") {
        resultadoMedia.classList.add("aprovado");
    } else {
        resultadoMedia.classList.add("reprovado");
    }
});
