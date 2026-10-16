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
