// --------------------------- Configurações do conteúdo principal ---------------------------------

const BODY = document.body.style;
const CAIXAS = document.querySelectorAll('.caixa'); // Seleciona todas as botões com a classe 'caixa'
const IMAGENS = []; // Array que armazenará os caminhos das imagens dos personagens
let imagensReveladas = []; // Array para armazenar imagens reveladas no clique
let caixasSelecionadas = []; // Array para armazenar as caixas que foram clicadas
let numeroDeVidas = document.getElementById('numero-de-vidas'); // Quantidade de vidas sendo exibidas ao usuário no cabeçalho do elemento <main>
let totalVidas = 5;
let acertos = 0;
const GAME_OVER_MSG = document.getElementById('game-over-msg');
const VIDA_RETIRADA = document.getElementById('vida-retirada');
let nivelAtual = 2; // Nível médio, por padrão (5 vidas)
const NIVEL_DIFICULDADE = document.getElementById('nivel-dificuldade');
const QUANTIDADE_INICIAL_VIDAS = document.getElementById('quantidade-inicial-vidas').style;
let jogoFinalizado = false;
const TEMA = document.getElementById('tema');
const MUSICA = new Audio('./_media/_sounds/soundtrack.ogg'); // Música tocada durante o jogo

// Embaralhamento das imagens
embaralharImagens(IMAGENS);

// Animação da introdução
document.addEventListener('DOMContentLoaded', () => {
    const INTRO = document.getElementById('intro').style;
    const SLIDER_CONTAINER = document.getElementById('slider-container').style;

    setTimeout(() => {
        QUANTIDADE_INICIAL_VIDAS.transition = '0.7s ease-in'
        QUANTIDADE_INICIAL_VIDAS.visibility = 'visible';
        QUANTIDADE_INICIAL_VIDAS.opacity = '1';
    }, 1500);

    setTimeout(() => {
        QUANTIDADE_INICIAL_VIDAS.transition = '0.7s ease-out';
        QUANTIDADE_INICIAL_VIDAS.visibility = 'hidden';
        QUANTIDADE_INICIAL_VIDAS.opacity = '0';
    }, 5000);

    CAIXAS.forEach(caixa => caixa.style.transform = 'translateX(60vw)');

    // Ação do botão "Começar"
    document.getElementById('start').addEventListener('click', async botaoStart => {
        botaoStart.target.style.display = 'none';
        SLIDER_CONTAINER.display = 'none';
        INTRO.transform = 'scale(5) rotate(-65deg)';
        INTRO.transition = '1s ease-in-out';
        INTRO.opacity = '0';
        INTRO.visibility = 'hidden';
        
        document.getElementById('logomark').style.animation = 'none';
        document.getElementById('luz-logomark-container').style.display = 'none';
        document.getElementById('texto-copyright').style.display = 'none';
        document.getElementById('caixas').style.display = 'grid';
        await pausar(2);

        MUSICA.play();
        MAIN.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        MAIN.backdropFilter = 'blur(6px)';
        MAIN.transition = '1.5s';
        BOTAO_MENU_LATERAL.style.transform = 'translate(60px, 50px)';
        BOTAO_MENU_LATERAL.style.transition = '1s';
        SETA_BOTAO_MENU_LATERAL.animation = 'apontar 0.6s linear 5';
        await pausar(2.5);

        for (const CAIXA of CAIXAS) {
            document.getElementById('cabecalho-principal').style.visibility = 'visible';
            CAIXA.style.visibility = 'visible';
            CAIXA.style.opacity = '1';
            CAIXA.style.transform = '';
            CAIXA.style.pointerEvents = 'none';
            await pausar(0.20);
        }

        CAIXAS.forEach(caixa => caixa.style.pointerEvents = 'auto'); 
    });
});

async function escolher(escolha) {
    const QUANTIDADE_ESCOLHIDA_VIDAS = document.getElementById('quantidade-escolhida-vidas');
    const NIVEL_ESCOLHIDO = document.getElementById('nivel-escolhido');

    switch (escolha) {
        case 'aumentar':
            nivelAtual++; // Mostra o próximo nível de dificuldade
            break;
        case 'diminuir':
            nivelAtual--; // Mostra o nível de dificuldade anterior
            break;
        case 'dia':
            TEMA.innerText = 'Dia';
            temaEscuro = false;
            alternarTema(temaEscuro, BODY, CAIXAS, MENU_LATERAL, CABECALHO_MENU_LATERAL);
            break;
        case 'noite':
            TEMA.innerText = 'Noite';
            temaEscuro = true;
            alternarTema(temaEscuro, BODY, CAIXAS, MENU_LATERAL, CABECALHO_MENU_LATERAL);
            break;
    }
    
    if (escolha == 'aumentar' || escolha == 'diminuir') {
        if (nivelAtual < 1) {
            nivelAtual = 1;
        } else if (nivelAtual > 3) {
            nivelAtual = 3;
        } else {
            /* O jogo irá começar com uma determinada quantidade de vidas
            de acordo com a escolha do nível de dificuldade */
            if (nivelAtual == 1) {
                totalVidas = 8;
                NIVEL_DIFICULDADE.innerText = 'Fácil';
                NIVEL_ESCOLHIDO.innerText = 'fácil';
            } else if (nivelAtual == 2) {
                totalVidas = 5;
                NIVEL_DIFICULDADE.innerText = 'Médio';
                NIVEL_ESCOLHIDO.innerText = 'médio';
            } else if (nivelAtual == 3) {
                totalVidas = 3;
                NIVEL_DIFICULDADE.innerText = 'Difícil';
                NIVEL_ESCOLHIDO.innerText = 'difícil';
            }
            
            numeroDeVidas.innerText = totalVidas;
            QUANTIDADE_ESCOLHIDA_VIDAS.innerText = totalVidas;
            QUANTIDADE_INICIAL_VIDAS.transition = 'none';
            QUANTIDADE_INICIAL_VIDAS.visibility = 'visible';
            QUANTIDADE_INICIAL_VIDAS.opacity = '1';
            await pausar(3);
            QUANTIDADE_INICIAL_VIDAS.transition = '0.7s ease-out';
            QUANTIDADE_INICIAL_VIDAS.visibility = 'hidden';
            QUANTIDADE_INICIAL_VIDAS.opacity = '0';
        }
    }
}

// Associa o evento de clique a cada caixa
CAIXAS.forEach((elemento, index) => {
    elemento.addEventListener('click', caixa => {
        var reiniciar = false;
                
        // Exibe a imagem correspondente à posição embaralhada
        caixa.target.style.backgroundImage = `url('${IMAGENS[index]}')`;
        caixa.target.style.filter = 'initial';
        caixa.target.style.transform = 'initial';
        caixa.target.style.pointerEvents = 'none';
        caixa.target.style.border = '5px silver groove';
        VIDA_RETIRADA.style.transform = '';
        
        // Guarda imagem e caixa selecionada
        imagensReveladas.unshift(IMAGENS[index]);
        caixasSelecionadas.unshift(caixa.target);

        // Quando duas imagens são reveladas
        if (imagensReveladas.length == 2) {
            if (imagensReveladas[0] !== imagensReveladas[1]) {
                totalVidas--;

                tocarEfeitoSonoro(false, null);
                setTimeout(() => VIDA_RETIRADA.style.visibility = 'hidden', 400);
                VIDA_RETIRADA.style.visibility = 'visible';
                VIDA_RETIRADA.style.transform = 'translateY(-150px)';
                VIDA_RETIRADA.innerText = '-1 vida';
                
                // Se forem diferentes, desativa temporariamente os cliques
                CAIXAS.forEach(objeto => objeto.style.pointerEvents = 'none');
                caixasSelecionadas[1].style.transform = 'initial';
                numeroDeVidas.innerText = totalVidas;
                numeroDeVidas.style.animation = 'mudaCor 0.3s linear 3';

                // Após um tempo, reseta as caixas para o estado inicial
                setTimeout(() => {
                    for (const CAIXA_SELECIONADA of caixasSelecionadas) {
                        // Define imagem de fundo conforme o tema
                        if (!temaEscuro)
                            CAIXA_SELECIONADA.style.backgroundImage = `url('_media/_images/box_yellow.png')`;
                        else
                            CAIXA_SELECIONADA.style.backgroundImage = `url('_media/_images/box_blue.png')`;

                        CAIXA_SELECIONADA.style.cursor = 'pointer';
                        setTimeout(() => CAIXA_SELECIONADA.style.pointerEvents = 'auto', 450);
                        CAIXA_SELECIONADA.style.transform = 'rotate(-360deg)';
                        CAIXA_SELECIONADA.style.boxShadow = 'none';
                        
                        // Restaura efeitos de hover
                        CAIXA_SELECIONADA.addEventListener('mouseenter', evento => {
                            evento.target.style.filter = '';
                            evento.target.style.transform = '';

                            if (!temaEscuro)
                                evento.target.style.boxShadow = '';
                            else
                                evento.target.style.boxShadow = '-10px 0px 30px var(--caixa-efeito-noite)',
                                '10px 0px 30px var(--caixa-efeito-noite)',
                                '0px -10px 30px var(--caixa-efeito-noite)',
                                '0px 10px 30px var(--caixa-efeito-noite)';
                        });

                        CAIXA_SELECIONADA.addEventListener('mouseleave', evento => {
                            evento.target.style.filter = '';
                            evento.target.style.transform = '';
                        });
                    }

                    // Reativa o clique nas caixas que ainda não foram resolvidas
                    CAIXAS.forEach(objeto => {
                        objeto.style.border = 'none';
                        const COR_DA_CAIXA = getComputedStyle(objeto).backgroundImage;

                        if (COR_DA_CAIXA.includes('box_yellow.png') || COR_DA_CAIXA.includes('box_blue.png'))
                            objeto.style.pointerEvents = 'auto';
                    });

                    // Limpa os arrays
                    imagensReveladas = [];
                    caixasSelecionadas = [];
                    numeroDeVidas.style.animation = 'initial';

                    if (totalVidas == 0) {
                        MUSICA.muted = true;
                        jogoFinalizado = true;

                        setTimeout(() => {
                            tocarEfeitoSonoro(null, false);
                            document.querySelector('#cabecalho-principal > figure').style.display = 'none';
                            GAME_OVER_MSG.innerHTML = 'Game<br><br>Over';
                            GAME_OVER_MSG.style.color = 'rgba(255, 50, 50, 0.9)';
                            GAME_OVER_MSG.style.visibility = 'visible';
                            GAME_OVER_MSG.style.opacity = 1;
                            GAME_OVER_MSG.style.animation = 'piscarMsg 0.6s ease-in-out infinite';
                        }, 1100);

                        CAIXAS.forEach(objeto => {
                            objeto.style.opacity = '0';
                            objeto.style.visibility = 'hidden';
                            objeto.style.transform = 'rotate(-360deg)';
                        });      

                        setTimeout(() => {
                            reiniciar = confirm('Deseja voltar para a tela inicial?');

                            if (reiniciar) location.reload();
                        }, 3600);
                    }        
                }, 1200);
            } else {
                acertos++;

                tocarEfeitoSonoro(true, null);
                // Se as imagens forem iguais (par encontrado), esconde as caixas
                CAIXAS.forEach(objeto => objeto.style.pointerEvents = 'none');
                caixasSelecionadas[0].style.transform = 'initial';
                caixasSelecionadas[1].style.transform = 'initial';

                // Após um tempo, faz as caixas desaparecerem
                setTimeout(() => {
                    for (const CAIXA_SELECIONADA of caixasSelecionadas) {
                        CAIXA_SELECIONADA.style.transform = 'translateY(-160px)';
                        CAIXA_SELECIONADA.style.transition = '0.7s';
                        CAIXA_SELECIONADA.style.opacity = '0';
                        CAIXA_SELECIONADA.style.visibility = 'hidden';
                    }

                    // Reativa cliques nas caixas não resolvidas
                    CAIXAS.forEach(objeto => {
                        const COR_DA_CAIXA = getComputedStyle(objeto).backgroundImage;

                        if (COR_DA_CAIXA.includes('box_yellow.png') || COR_DA_CAIXA.includes('box_blue.png'))
                            objeto.style.pointerEvents = 'auto';
                    });

                    // Limpa os arrays
                    imagensReveladas = [];
                    caixasSelecionadas = [];

                    if (acertos == 8) {
                        acertos = 0;
                        MUSICA.muted = true;
                        jogoFinalizado = true;

                        setTimeout(() => {
                            tocarEfeitoSonoro(null, true);
                            document.querySelector('#cabecalho-principal > figure').style.display = 'none';
                            GAME_OVER_MSG.innerHTML = 'You<br><br>Win!';
                            GAME_OVER_MSG.style.marginLeft = '4rem';
                            GAME_OVER_MSG.style.color = 'lime';
                            GAME_OVER_MSG.style.visibility = 'visible';
                            GAME_OVER_MSG.style.opacity = 1;
                            GAME_OVER_MSG.style.animation = 'piscarMsg 0.6s ease-in-out infinite';
                        }, 1100);

                        setTimeout(() => alert('Você conseguiu finalizar!'), 3600);
                    }
                }, 1200);
            }
        }
    });
});

// ------------------------------- Menu lateral e submenus -------------------------------------

const BOTAO_MENU_LATERAL = document.getElementById('botao-menu-lateral');
const MAIN = document.querySelector('main').style; 
const SETA_BOTAO_MENU_LATERAL = document.getElementById('seta-botao-menu-lateral').style; // Seleciona o estilo da seta do botão de menu lateral
const MENU_LATERAL = document.getElementById('menu-lateral').style;
const CABECALHO_MENU_LATERAL = document.getElementById('cabecalho-menu-lateral').style;
const SUB_MENU_TEMAS = document.getElementById('sub-menu-temas').style;
const SUB_MENU_MUSICA = document.getElementById('sub-menu-musica').style;
let menuVisivel = true; // Variável para controlar a visibilidade do menu lateral     
let temaEscuro = false; // Variável para controlar o tema escuro/claro

// Mostra ou oculta o menu lateral
BOTAO_MENU_LATERAL.addEventListener('click', evento => {
    if (!menuVisivel) {
        // Ao fechar o menu
        if (medidaDaTela(1230)) {
            MAIN.transform = 'initial';
            MAIN.transition = '0.5s';
        }

        MENU_LATERAL.transform = 'translateX(-100%)';
        MENU_LATERAL.transition = '0.5s';
        evento.target.style.transform = 'translate(60px, 50px)';
        evento.target.style.transition = '0.5s';
        evento.target.title = 'Abrir menu';
        SETA_BOTAO_MENU_LATERAL.transform = 'initial';
        SETA_BOTAO_MENU_LATERAL.transition = '0.4s';
        menuVisivel = true;  
    } else {
        // Ao abrir o menu
        if (medidaDaTela(1230)){
            MAIN.transform = 'translateX(215px)';
            MAIN.transition = '0.5s';
        }
        
        MENU_LATERAL.transform = 'initial';
        MENU_LATERAL.transition = '0.5s';
        evento.target.style.transform = 'translate(60px, 50px)';
        evento.target.style.transition = '0.5s';
        evento.target.title = 'Fechar menu';
        SETA_BOTAO_MENU_LATERAL.transform = 'rotate(180deg)';
        SETA_BOTAO_MENU_LATERAL.transition = '0.4s';
        menuVisivel = false;
    }
});

// Botão para o submenu de temas
document.getElementById('opcao-temas').addEventListener('mouseenter', evento => {
    SUB_MENU_MUSICA.transition = '0.2s';
    SUB_MENU_MUSICA.transform = 'scaleY(0)';
    SUB_MENU_TEMAS.transition = '0.2s';
    SUB_MENU_TEMAS.transform = 'scaleY(1)';

    evento.target.addEventListener('mouseleave', () => {
        SUB_MENU_TEMAS.transition = '0.2s';
        SUB_MENU_TEMAS.transform = 'scaleY(0)';
    });
});

// Alterna para os temas "Noite"/"Dia"
document.querySelectorAll('#sub-menu-temas > li').forEach(opcao => {
    opcao.addEventListener('click', () => {
        if (opcao.textContent == '🌙 Noite') {
            temaEscuro = true;
            alternarTema(temaEscuro, BODY, CAIXAS, MENU_LATERAL, CABECALHO_MENU_LATERAL);
        } else if (opcao.textContent == '☀️ Dia') {
            temaEscuro = false;
            alternarTema(temaEscuro, BODY, CAIXAS, MENU_LATERAL, CABECALHO_MENU_LATERAL);
        }
    });
});

// Opção para o submenu "Música"
document.getElementById('opcao-musica').addEventListener('mouseenter', evento => {
    SUB_MENU_TEMAS.transition = '0.2s';
    SUB_MENU_TEMAS.transform = 'scaleY(0)';
    SUB_MENU_MUSICA.transition = '0.2s';
    SUB_MENU_MUSICA.transform = 'scaleY(1)';

    evento.target.addEventListener('mouseleave', () => {
        SUB_MENU_MUSICA.transition = '0.2s';
        SUB_MENU_MUSICA.transform = 'scaleY(0)';
    });
});

// Ativar ou desativar a música de fundo
document.querySelectorAll('#sub-menu-musica > li').forEach(opcao => {
    opcao.addEventListener('click', () => {
        if (!jogoFinalizado) {
            if (opcao.textContent === '🔊 Ativada') {
                MUSICA.muted = false;
                MUSICA.play();
            } else if (opcao.textContent === '🔇 Desativada') {
                MUSICA.muted = true;
                MUSICA.currentTime = 0;
            }
        }
    });
});

// Ação da opção "Sobre"
document.getElementById('opcao-sobre').addEventListener('click', () => {
    const SOBRE = document.getElementById('sobre').style;

    if (SOBRE.display != 'block')
        SOBRE.display = 'block';
    else
        SOBRE.display = 'none';
});

document.getElementById('fechar-sobre').addEventListener('click', () => {
    document.getElementById('sobre').style.display = 'none';
});

document.getElementById('opcao-sair').addEventListener('click', () =>  {
    var confirmado = confirm('Tem certeza que deseja sair?');

    if (confirmado) close();
});
