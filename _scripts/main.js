// ----------------------------------- Configurações do conteúdo principal -----------------------------------

const body = document.body.style;
const cardsContainer = document.getElementById('cards');
const cards = criarCards(); // Retorna todos os elementos <button> de classe 'card'
const imagens = []; // Array que armazenará os caminhos das imagens dos personagens
let imagensReveladas = []; // Array para armazenar imagens reveladas no clique
let cardsSelecionados = []; // Array para armazenar os "cards" que foram selecionados
let numeroDeVidas = document.getElementById('numero-de-vidas'); // Quantidade de vidas sendo exibidas ao usuário no cabeçalho do elemento <main>
let totalVidas = 8; // Por padrão, a quantidade atual de vidas é 8
let acertos = 0;
const slidesContainer = document.getElementById('slides-container').style;
let nivelAtual = 2; // O nível médio fica selecionado por padrão (8 vidas)
const nivelDificuldade = document.getElementById('nivel-dificuldade');
const quantidadeInicialVidas = document.getElementById('quantidade-inicial-vidas').style;
const temaSlider = document.getElementById('tema-slider');
const musica = new Audio('./_assets/_sounds/soundtrack.ogg'); // Música que será tocada durante o jogo
let combo = 0; // Combo de acertos consecutivos
let jogoFinalizado = false;
const comboMsg = comboMensagem();
const gameOverMsg = gameOverMensagem();

// Inicialização de interatividade e animações na introdução ao carregar
document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro').style;
    numeroDeVidas.innerText = totalVidas;
    brilharLogomark(); // Brilho da logo na introdução
    embaralharImagens(imagens); // Embaralhamento das imagens
    
    setTimeout(() => {
        quantidadeInicialVidas.transition = '0.7s ease-in'
        quantidadeInicialVidas.visibility = 'visible';
        quantidadeInicialVidas.opacity = '1';
    }, 1500);

    setTimeout(() => {
        quantidadeInicialVidas.transition = '0.7s ease-out';
        quantidadeInicialVidas.visibility = 'hidden';
        quantidadeInicialVidas.opacity = '0';
    }, 5000);

    cards.forEach(card => card.style.transform = 'translateX(60vw)');

    // Ação do botão "Começar"
    document.getElementById('start').addEventListener('click', async evento => {
        musica.loop = true;
        evento.target.style.display = 'none';
        slidesContainer.display = 'none';
        intro.transform = 'scale(6) rotate(-65deg)';
        intro.transition = '1.2s ease-in-out';
        intro.opacity = '0';
        intro.visibility = 'hidden';
        
        document.getElementById('logomark').style.animation = 'none';
        document.getElementById('brilho-logomark-container').style.display = 'none';
        document.getElementById('texto-copyright').style.display = 'none';
        document.getElementById('cards').style.display = 'grid';
        await pausar(1.5);

        musica.play();
        main.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        main.backdropFilter = 'blur(7px)';
        main.transition = '1.5s';
        botaoMenuLateral.style.transform = 'translate(60px, 50px)';
        botaoMenuLateral.style.transition = '1s';
        setaBotaoMenuLateral.animationDelay = '10s';
        setaBotaoMenuLateral.animation = 'apontar 0.6s linear 5';
        await pausar(1.7);

        for (const card of cards) {
            document.getElementById('cabecalho-principal').style.visibility = 'visible';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
            card.style.transform = '';
            card.style.pointerEvents = 'none';
            await pausar(0.20);
        }

        cards.forEach(card => card.style.pointerEvents = 'auto'); 
    });
});

// Funcionalidade dos slides de opções na introdução
document.querySelectorAll('.escolha').forEach(escolha => {
    escolha.addEventListener('click', async () => {
        const quantiadeEscolhidaVidas = document.getElementById('quantidade-escolhida-vidas');
        const nivelEscolhido = document.getElementById('nivel-escolhido');

        if (escolha.classList.contains('nivel-seta-esquerda')) {
            nivelAtual--;  // Reduz o nível de dificuldade
        } else if (escolha.classList.contains('nivel-seta-direita')) {
            nivelAtual++; // Aumenta o nível de dificuldade
        } else if (escolha.classList.contains('tema-seta-esquerda')) {
            temaSlider.innerText = 'Dia';
            temaNoturnoAtivado = false;
            temaSelecionado[0].style.color = 'gold'; // Cor de destaque do tema escolhido (Dia)
            temaSelecionado[1].style.color = 'var(--fonte-cor-padrao)';
            alternarTema(temaNoturnoAtivado, body, cards, menuLateral, cabecalhoMenuLateral);
        } else if (escolha.classList.contains('tema-seta-direita')) {
            temaSlider.innerText = 'Noite';
            temaNoturnoAtivado = true;
            temaSelecionado[0].style.color = 'var(--fonte-cor-padrao)';
            temaSelecionado[1].style.color = 'gold'; // Cor de destaque do tema escolhido (Noite)
            alternarTema(temaNoturnoAtivado, body, cards, menuLateral, cabecalhoMenuLateral);
        }

        if (escolha.classList.contains('nivel-seta-esquerda') || escolha.classList.contains('nivel-seta-direita')) {
            if (nivelAtual < 1) {
                nivelAtual = 1;
            } else if (nivelAtual > 3) {
                nivelAtual = 3;
            } else {
                /* O jogo irá começar com uma determinada quantidade de vidas
                de acordo com a escolha do nível de dificuldade */
                if (nivelAtual == 1) {
                    totalVidas = 10;
                    nivelDificuldade.innerText = 'Fácil';
                    nivelEscolhido.innerText = 'fácil,';
                } else if (nivelAtual == 2) {
                    totalVidas = 8;
                    nivelDificuldade.innerText = 'Médio';
                    nivelEscolhido.innerText = 'médio,';
                } else if (nivelAtual == 3) {
                    totalVidas = 6;
                    nivelDificuldade.innerText = 'Difícil';
                    nivelEscolhido.innerText = 'difícil,';
                }
                
                numeroDeVidas.innerText = totalVidas;
                quantiadeEscolhidaVidas.innerText = totalVidas;
                quantidadeInicialVidas.transition = 'none';
                quantidadeInicialVidas.visibility = 'visible';
                quantidadeInicialVidas.opacity = '1';
                await pausar(3);
                quantidadeInicialVidas.transition = '0.7s ease-out';
                quantidadeInicialVidas.visibility = 'hidden';
                quantidadeInicialVidas.opacity = '0';
            }
        }
    })
})

// Associa o evento de clique a cada "card"
cards.forEach((card, index) => {
    card.addEventListener('click', evento => {
        // Exibe a imagem correspondente à posição embaralhada
        evento.target.style.backgroundImage = `url('${imagens[index]}')`;
        evento.target.style.filter = 'initial';
        evento.target.style.transform = 'initial';
        evento.target.style.pointerEvents = 'none';
        evento.target.style.border = '5px silver groove';
        
        // Guarda imagem e "card" selecionada
        imagensReveladas.unshift(imagens[index]);
        cardsSelecionados.unshift(evento.target);

        // Quando duas imagens são reveladas
        if (imagensReveladas.length == 2) {
            if (imagensReveladas[0] !== imagensReveladas[1]) {
                totalVidas--;
                combo = 0;
                comboMsg.style.transform = '';
                comboMsg.style.visibility = 'hidden';
                
                tocarEfeitoSonoro(false, null);      
                cards.forEach(card => card.style.pointerEvents = 'none'); // Se forem diferentes, desativa temporariamente os cliques
                cardsSelecionados[1].style.transform = 'initial';
                numeroDeVidas.innerText = totalVidas;
                numeroDeVidas.style.animation = 'destacarVidas 0.4s linear 4 alternate';

                // Após um tempo, reseta os cards para o estado inicial
                setTimeout(() => {
                    for (const cardSelecionado of cardsSelecionados) {
                        // Define imagem de fundo conforme o tema
                        if (!temaNoturnoAtivado)
                            cardSelecionado.style.backgroundImage = `url('_assets/_images/box_yellow.png')`;
                        else
                            cardSelecionado.style.backgroundImage = `url('_assets/_images/box_blue.png')`;

                        cardSelecionado.style.cursor = 'pointer';
                        setTimeout(() => cardSelecionado.style.pointerEvents = 'auto', 450);
                        cardSelecionado.style.transform = 'rotateY(-360deg)';
                        cardSelecionado.style.boxShadow = 'none';
                        
                        // Restaura efeitos de hover
                        cardSelecionado.addEventListener('mouseenter', evento => {
                            evento.target.style.filter = '';
                            evento.target.style.transform = '';

                            if (!temaNoturnoAtivado)
                                evento.target.style.boxShadow = '';
                            else
                                evento.target.style.boxShadow = '10px 10px 30px var(--card-efeito-noite)',
                                '15px 15px 50px var(--card-efeito-noite)',
                                '-10px -10px 30px var(--card-efeito-noite)',
                                '-15px -15px 50px var(--card-efeito-noite)';
                        });

                        cardSelecionado.addEventListener('mouseleave', evento => {
                            evento.target.style.filter = '';
                            evento.target.style.transform = '';
                        });
                    }

                    // Reativa o clique nos cards que ainda não foram resolvidos
                    cards.forEach(card => {
                        card.style.border = 'none';
                        const corDoCard = getComputedStyle(card).backgroundImage;

                        if (corDoCard.includes('box_yellow.png') || corDoCard.includes('box_blue.png'))
                            card.style.pointerEvents = 'auto';
                    });

                    // Limpa os arrays
                    imagensReveladas = [];
                    cardsSelecionados = [];
                    numeroDeVidas.style.animation = 'initial';

                    if (totalVidas == 0) {
                        musica.muted = true;
                        jogoFinalizado = true;

                        cards.forEach(card => {
                            card.style.transform = 'rotate(-360deg)';
                            card.style.opacity = '0';
                            card.style.visibility = 'hidden';
                        });

                        setTimeout(() => {
                            tocarEfeitoSonoro(null, false);
                            comboMsg.style.visibility = 'hidden';
                            gameOverMsg.innerHTML = 'Game<br><br>Over';
                            gameOverMsg.style.left = '14%';
                            gameOverMsg.style.color = 'rgba(255, 50, 50, 0.9)';
                            gameOverMsg.style.visibility = 'visible';
                            gameOverMsg.style.opacity = 1;
                            gameOverMsg.style.animation = 'piscarGameOver 0.6s linear infinite';
                        }, 1100);

                        setTimeout(() => {
                            var reiniciar = confirm('Deseja voltar para a tela inicial?');
                            
                            if (reiniciar) location.reload();
                        }, 3600);
                    }        
                }, 1200);
            } else {
                acertos++;
                combo++;

                if (combo >= 2) {
                    comboMsg.style.visibility = 'visible';
                    comboMsg.innerText = `Combo ${combo}x`;
                    comboMsg.style.animation = `ressaltar 0.4s linear infinite alternate,
                    colorirMensagem 0.5s ease-in-out infinite alternate`;
                }

                tocarEfeitoSonoro(true, null);
                cards.forEach(card => card.style.pointerEvents = 'none'); // Se as imagens forem iguais (par encontrado), esconde os cards
                cardsSelecionados[0].style.transform = 'initial';
                cardsSelecionados[1].style.transform = 'initial';

                // Após um tempo, faz os cards desaparecerem
                setTimeout(() => {
                    for (const cardSelecionado of cardsSelecionados) {
                        cardSelecionado.style.transform = 'translateY(-160px)';
                        cardSelecionado.style.transition = '0.7s';
                        cardSelecionado.style.opacity = '0';
                        cardSelecionado.style.visibility = 'hidden';
                    }

                    // Reativa cliques nos cards não resolvidos
                    cards.forEach(card => {
                        const corDoCard = getComputedStyle(card).backgroundImage;

                        if (corDoCard.includes('box_yellow.png') || corDoCard.includes('box_blue.png'))
                            card.style.pointerEvents = 'auto';
                    });

                    // Limpa os arrays
                    imagensReveladas = [];
                    cardsSelecionados = [];

                    if (acertos == 10) {
                        acertos = 0;
                        musica.muted = true;
                        jogoFinalizado = true;

                        setTimeout(() => {
                            tocarEfeitoSonoro(null, true);
                            comboMsg.style.visibility = 'hidden';
                            gameOverMsg.innerHTML = 'You<br><br>Win!';
                            gameOverMsg.style.left = '17%';
                            gameOverMsg.style.color = 'lime';
                            gameOverMsg.style.visibility = 'visible';
                            gameOverMsg.style.opacity = 1;
                            gameOverMsg.style.animation = 'piscarGameOver 0.6s linear infinite';
                        }, 1100);

                        setTimeout(() => alert('Você conseguiu finalizar!'), 3600);
                    }
                }, 1200);
            }
        }
    });
});

// ----------------------------------------- Menu lateral e submenus -----------------------------------------

const botaoMenuLateral = document.getElementById('botao-menu-lateral');
const main = document.querySelector('main').style; 
const setaBotaoMenuLateral = document.getElementById('seta-botao-menu-lateral').style; // Seleciona o estilo da seta do botão de menu lateral
const menuLateral = document.getElementById('menu-lateral').style;
const cabecalhoMenuLateral = document.getElementById('cabecalho-menu-lateral').style;
const subMenuTemas = document.getElementById('sub-menu-temas').style;
const temaSelecionado = document.querySelectorAll('#sub-menu-temas li');
const subMenuMusica = document.getElementById('sub-menu-musica').style;
let menuAberto = true; // Variável para controlar a visibilidade do menu lateral     
let temaNoturnoAtivado = false; // Variável para controlar o tema "Dia"/"Noite"

// Mostra ou oculta o menu lateral
botaoMenuLateral.addEventListener('click', evento => {
    if (menuAberto) { // Ao abrir o menu
        if (medidaDaTela(1230)){
            main.transform = 'translateX(215px)';
            main.transition = '0.5s';
        }
        
        menuLateral.transform = 'initial';
        menuLateral.transition = '0.5s';
        evento.target.style.transform = 'translate(60px, 50px)';
        evento.target.style.transition = '0.5s';
        evento.target.title = 'Fechar menu';
        setaBotaoMenuLateral.transform = 'rotate(180deg)';
        setaBotaoMenuLateral.transition = '0.4s';
        menuAberto = false;
    } else { // Ao fechar o menu
        if (medidaDaTela(1230)) {
            main.transform = 'initial';
            main.transition = '0.5s';
        }

        menuLateral.transform = 'translateX(-100%)';
        menuLateral.transition = '0.5s';
        evento.target.style.transform = 'translate(60px, 50px)';
        evento.target.style.transition = '0.5s';
        evento.target.title = 'Abrir menu';
        setaBotaoMenuLateral.transform = 'initial';
        setaBotaoMenuLateral.transition = '0.4s';
        menuAberto = true;  
    }
});

// Botão para o submenu de temas
document.getElementById('opcao-temas').addEventListener('mouseenter', evento => {
    subMenuMusica.transition = '0.2s';
    subMenuMusica.transform = 'scaleY(0)';
    subMenuTemas.transition = '0.2s';
    subMenuTemas.transform = 'scaleY(1)';

    evento.target.addEventListener('mouseleave', () => {
        subMenuTemas.transition = '0.2s';
        subMenuTemas.transform = 'scaleY(0)';
    });
});

// Alterna para os temas "Noite"/"Dia"
temaSelecionado.forEach(tema => {
    tema.addEventListener('click', evento => {
        // Por padrão, o tema "Dia" fica ativado
        if (evento.target.textContent === '🌙 Noite') {
            temaNoturnoAtivado = true;
            alternarTema(temaNoturnoAtivado, body, cards, menuLateral, cabecalhoMenuLateral);
        } else if (evento.target.textContent === '☀️ Dia') {
            temaNoturnoAtivado = false;
            alternarTema(temaNoturnoAtivado, body, cards, menuLateral, cabecalhoMenuLateral);
        }

        for (const li of temaSelecionado) li.style.color = 'var(--cor-fonte-padrao)';

        // Cor de destaque da opção selecionada
        evento.target.style.color = 'gold';
    });
});

// Opção para o submenu "Música"
document.getElementById('opcao-musica').addEventListener('mouseenter', evento => {
    subMenuTemas.transition = '0.2s';
    subMenuTemas.transform = 'scaleY(0)';
    subMenuMusica.transition = '0.2s';
    subMenuMusica.transform = 'scaleY(1)';

    evento.target.addEventListener('mouseleave', () => {
        subMenuMusica.transition = '0.2s';
        subMenuMusica.transform = 'scaleY(0)';
    });
});

// Ativar ou desativar a música de fundo
document.querySelectorAll('#sub-menu-musica li').forEach(elemento => {
    elemento.addEventListener('click', evento => {
        if (!jogoFinalizado) {
            if (evento.target.textContent === '🔊 Ativada') {
                musica.muted = false;
                musica.play();
            } else if (evento.target.textContent === '🔇 Desativada') {
                musica.muted = true;
                musica.currentTime = 0;
            }

            for (const li of document.querySelectorAll('#sub-menu-musica li'))
                li.style.color = 'var(--fonte-cor-padrao)';

            // Cor de destaque da opção selecionada
            evento.target.style.color = 'gold';
        }
    });
});

// Ação da opção "Sobre"
document.getElementById('opcao-sobre').addEventListener('click', () => {
    const sobre = document.getElementById('sobre').style;

    sobre.display = sobre.display != 'block' ? 'block' : 'none';
});

document.getElementById('fechar-sobre').addEventListener('click', () => document.getElementById('sobre').style.display = 'none');

document.getElementById('opcao-sair').addEventListener('click', () => {
    var sair = confirm('Tem certeza que deseja sair?');

    if (sair) close();
});
