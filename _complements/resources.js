// Algoritmo para embaralhar as imagens
function embaralharImagens(imagens) {
    // Adiciona duas vezes os caminhos das imagens ao array, formando pares
    for (let i = 0; i < 2; i++) {
        for (let numeroDaImagem = 0; numeroDaImagem < 10; numeroDaImagem++)
            imagens.unshift(`_media/_images/person-${numeroDaImagem}.png`);
    }

    // Randomiza a posição de cada imagem do array
    for (let y = imagens.length - 1; y > 0; y--) {
        const X = Math.floor(Math.random() * (y + 1));
        [imagens[y], imagens[X]] = [imagens[X], imagens[y]]; 
    }
}

// Verifica a largura da tela
function medidaDaTela(medida) {
    const MEDIDA_MAXIMA = matchMedia(`(max-width: ${medida}px)`);

    return MEDIDA_MAXIMA.matches;
}

// Emite os efeitos sonoros no caso de erro, acerto, derrota ou vitória
function tocarEfeitoSonoro(acertou, venceu) {
    if (acertou != null) {
        const SOM_DE_ERRO = new Audio('./_media/_sounds/error.mp3');
        SOM_DE_ERRO.volume = 0.6;

        if (acertou)
            new Audio('./_media/_sounds/success.mp3').play();
        else
            SOM_DE_ERRO.play();
    }

    if (venceu != null) {
        if (venceu) 
            new Audio('./_media/_sounds/victory.wav').play();
        else
            new Audio('./_media/_sounds/game-over.wav').play();
    }
}

// Pausa o andamento do código por um tempo determinado
function pausar(seg) {
    seg *= 1000;

    return new Promise(resolve => setTimeout(resolve, seg));
}

// Algoritmo para a alternância dos temas "Noite"/"Dia"
function alternarTema(temaStatus, body, vetorDeElementos, menu, cabecalho) {
    if (temaStatus) {
        body.backgroundImage = "url('_media/_images/bg_night.png')";
        menu.backgroundImage = "url('_media/_images/bg-3_night.png')";
        cabecalho.backgroundImage = "url('_media/_images/title-memory-game_night.png')";

        vetorDeElementos.forEach(caixa => {
            const IMAGEM_REVELADA = getComputedStyle(caixa).backgroundImage;

            if (!IMAGEM_REVELADA.includes(`box_blue.png`)) 
                caixa.style.backgroundImage = "url('_media/_images/box_blue.png')";

            for (let numeroDaImagem = 0; numeroDaImagem < 8; numeroDaImagem++) {
                if (IMAGEM_REVELADA.includes(`person-${numeroDaImagem}.png`))
                    caixa.style.backgroundImage = IMAGEM_REVELADA;
            }

            // Adiciona efeitos de hover específicos do tema escuro
            caixa.addEventListener('mouseenter', evento => {
                evento.target.style.boxShadow = '-10px 0px 30px var(--caixa-efeito-noite)',
                '10px 0px 30px var(--caixa-efeito-noite)',
                '0px -10px 30px var(--caixa-efeito-noite)',
                '0px 10px 30px var(--caixa-efeito-noite)';
            });

            caixa.addEventListener('mouseleave', evento => evento.target.style.boxShadow = 'none');
        });
    } else {
        body.backgroundImage = "url('_media/_images/bg.png')";
        menu.backgroundImage = "url('_media/_images/bg-3.png')";
        cabecalho.backgroundImage = "url('_media/_images/title-memory-game.png')";

        vetorDeElementos.forEach(caixa => {
            const IMAGEM_REVELADA = getComputedStyle(caixa).backgroundImage;

            if (!IMAGEM_REVELADA.includes('box_yellow.png'))
                caixa.style.backgroundImage = "url('_media/_images/box_yellow.png')";

            for (let numeroDaImagem = 0; numeroDaImagem < 8; numeroDaImagem++) {
                if (IMAGEM_REVELADA.includes(`person-${numeroDaImagem}.png`))
                    caixa.style.backgroundImage = IMAGEM_REVELADA;
            }

            // Remove efeitos de hover do tema escuro
            caixa.addEventListener('mouseenter', evento => evento.target.style.boxShadow = '');
            caixa.addEventListener('mouseleave', evento => evento.target.style.boxShadow = 'none');
        });
    }
}
