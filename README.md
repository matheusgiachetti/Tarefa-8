# Portal do Estudante

Site fictício de um portal acadêmico, criado na **Tarefa 08** da disciplina de **Web Design** (Facens).
A página reúne informações sobre o portal, uma calculadora de média e os cards das disciplinas do semestre.
Toda a interatividade é feita com **JavaScript puro**, aplicando os conteúdos da aula **"JS: Sintaxe, Variáveis e Estruturas"**.

## Objetivo da atividade

- Praticar a sintaxe básica do JavaScript: variáveis, tipos de dados, operadores e estruturas de controle.
- Manipular o DOM para deixar a página interativa (eventos, textos e classes CSS).
- Recriar os exemplos vistos em aula: dark mode, botão voltar ao topo, efeito de digitação, pop-up (modal) e alterar texto com botão.
- Manter o JavaScript em um arquivo externo, separado do HTML e do CSS.
- Aproveitar o layout com Flexbox e a responsividade estudados na aula anterior.

## Tecnologias

- **HTML5**: estrutura da página com tags semânticas (`header`, `nav`, `main`, `section`, `article`, `footer`).
- **CSS3**: variáveis de cor no `:root`, Flexbox, transições e `@media` para celular.
- **JavaScript (ES6)**: puro, sem frameworks, bibliotecas ou CDN.
- **Git e GitHub**: versionamento com um commit por etapa.

## Como abrir o projeto

1. Clone o repositório ou baixe os arquivos:
   ```bash
   git clone https://github.com/matheusgiachetti/Tarefa-8.git
   ```
2. Abra a pasta do projeto.
3. Dê dois cliques no arquivo `index.html` para abrir no navegador (não precisa de servidor).
4. Para ver as mensagens do JavaScript, abra o console do navegador com **F12** > aba **Console**.
   Ao carregar a página deve aparecer a mensagem `Script carregado`.

## Estrutura de arquivos

```
Tarefa-8/
├── index.html   # estrutura da página (HTML semântico)
├── style.css    # estilos, Flexbox, modo escuro e responsividade
├── script.js    # todas as funcionalidades em JavaScript
├── README.md    # documentação do projeto
└── .gitignore   # arquivos que não vão para o Git
```

O `script.js` é ligado no final do `body` com `<script src="script.js"></script>`, para que o HTML já exista quando o script rodar.
Não há JavaScript inline nem atributos `onclick` no HTML: todos os eventos são registrados com `addEventListener`.

## Funcionalidades

### 1. Dark mode (modo escuro)

**O que faz:** o botão "Modo escuro" do cabeçalho troca o tema da página entre claro e escuro, e o texto do botão muda para indicar a próxima ação.

**Como funciona:** o CSS define as cores em variáveis no `:root`; a classe `.dark` no `body` redefine essas variáveis, então o site inteiro muda de cor de uma vez.

**Conceitos de JS:** `const`, `getElementById`, `addEventListener`, `classList.toggle`, operador ternário e `textContent`.

```js
botaoDark.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    const modoEscuroAtivo = document.body.classList.contains("dark");
    botaoDark.textContent = modoEscuroAtivo ? "Modo claro" : "Modo escuro";
});
```

### 2. Botão voltar ao topo

**O que faz:** um botão redondo com uma seta aparece no canto inferior direito depois que a página é rolada mais de 200 pixels. Ao clicar nele, a página volta ao topo com animação suave.

**Como funciona:** o botão começa escondido pelo CSS (`opacity: 0` e `visibility: hidden`). O JS adiciona ou remove a classe `.visivel` conforme a rolagem.

**Conceitos de JS:** evento `scroll`, `window.scrollY`, operador de comparação `>`, `if/else`, `classList.add/remove` e `window.scrollTo` com um objeto de opções.

```js
window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
        botaoTopo.classList.add("visivel");
    } else {
        botaoTopo.classList.remove("visivel");
    }
});

botaoTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
```

### 3. Efeito de digitação (typewriter)

**O que faz:** o título do banner é escrito letra por letra ao abrir a página: "Bem-vindo ao Portal do Estudante!".

**Como funciona:** a função `digitar()` adiciona uma letra ao `span#typewriter`, avança o índice e agenda a si mesma com `setTimeout`, repetindo até chegar ao fim do texto.

**Conceitos de JS:** `let` (o índice muda), `length` da string, `charAt`, operador de atribuição `+=`, incremento `index++`, `if` e `setTimeout`.

```js
function digitar() {
    if (index < textoDigitacao.length) {
        elementoDigitacao.textContent += textoDigitacao.charAt(index);
        index++;
        setTimeout(digitar, velocidade);
    }
}
```

### 4. Pop-up (modal)

**O que faz:** o botão "Saiba mais" do banner abre uma janela de boas-vindas sobre um fundo escuro. Ela fecha pelo botão "×" ou ao clicar fora da caixa.

**Como funciona:** o modal começa com `display: none` no CSS. A classe `.aberto` troca para `display: flex`, o que também centraliza a caixa na tela.

**Conceitos de JS:** `addEventListener`, `classList.add/remove`, o objeto do evento (`e.target`) e o operador de igualdade estrita `===`.

```js
modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.classList.remove("aberto");
    }
});
```

### 5. Calculadora de média (alterar texto com botão)

**O que faz:** o usuário digita duas notas e clica em "Calcular". O parágrafo de resultado mostra a média e a situação, com uma cor diferente para cada caso:

| Média        | Situação  | Cor      |
|--------------|-----------|----------|
| 9 ou mais    | Excelente | azul     |
| de 7 a 8,99  | Aprovado  | verde    |
| menor que 7  | Reprovado | vermelho |

Se algum campo estiver vazio, ou uma nota estiver fora de 0 a 10, aparece um aviso em laranja.

**Conceitos de JS:** `.value`, conversão com `Number()`, `typeof`, operadores aritméticos (`+` e `/`), operadores lógicos (`||`), `function` com `return`, arrow function, `if / else if / else`, template string, `textContent` e `classList`.

```js
function calcularMedia(nota1, nota2) {
    return (nota1 + nota2) / 2;
}

const classificar = (media) => {
    if (media >= 9) {
        return "Excelente";
    } else if (media >= 7) {
        return "Aprovado";
    } else {
        return "Reprovado";
    }
};
```

## Conceitos da aula aplicados

- **Variáveis:** `const` para valores que não mudam (elementos do DOM, textos, velocidade) e `let` para o índice da digitação, que é incrementado.
- **Tipos de dados:** strings (textos), numbers (notas e médias), booleans (`modoEscuroAtivo`) e objetos. O `typeof` mostra no console que `.value` é `"string"` e, depois do `Number()`, vira `"number"`.
- **Operadores aritméticos:** `+` e `/` no cálculo da média.
- **Operadores de comparação:** `>`, `>=`, `<` e `===` (scroll, classificação, validação e clique fora do modal).
- **Operadores lógicos:** `||` para verificar se algum campo está vazio ou alguma nota está fora do intervalo.
- **Operadores de atribuição:** `=`, `+=` (adiciona letra ao título) e `++` (avança o índice).
- **Condicionais:** `if/else`, `if / else if / else` e o operador ternário.
- **Repetição:** o efeito de digitação repete a mesma ação letra por letra até o fim do texto, controlado pela condição `index < textoDigitacao.length` (o mesmo papel de um laço `while`, mas com uma pausa entre as repetições via `setTimeout`).
- **Funções:** declaração com `function`, arrow function, parâmetros, `return` e funções anônimas como callback dos eventos.
- **Strings como sequência indexada:** `length` e `charAt(index)` percorrem o texto pela posição, assim como se faz com o índice de um array.
- **Objetos:** `document`, `window` e o evento `e` são objetos com propriedades e métodos; `{ top: 0, behavior: "smooth" }` é um objeto literal passado para `scrollTo`.
- **DOM:** `getElementById`, `addEventListener`, `textContent`, `value` e `classList`.
- **Console:** `console.log` para testar a ligação do script e conferir os tipos.

## Responsividade

- O layout usa **Flexbox** no cabeçalho, no banner, nas seções, na calculadora, nos cards e no rodapé.
- Os cards usam `flex-wrap: wrap` com largura base, então se reorganizam sozinhos conforme o tamanho da tela.
- Em telas de até **768px** (`@media (max-width: 768px)`):
  - o cabeçalho fica em coluna, com o menu centralizado e quebrando linha;
  - o banner e as seções ganham menos espaçamento, e os títulos ficam menores;
  - os dois campos de nota ficam um embaixo do outro;
  - o rodapé fica centralizado em coluna.
- O `meta viewport` no `head` garante que o celular use a largura real da tela.

## Autor

**Matheus Giachetti**
Facens — Web Design
Prof. Deivison S. Takatu
