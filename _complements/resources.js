// Algoritmo para embaralhar vetor
function embaralharImagens(vetor) {
    // Adiciona duas vezes os caminhos das imagens ao array, formando pares
    for (let i = 0; i < 2; i++) {
        for (let numeroDaImagem = 0; numeroDaImagem < 8; numeroDaImagem++)
            vetor.unshift(`_media/_images/person-${numeroDaImagem}.png`);
    }
    
    for (let y = vetor.length - 1; y > 0; y--) {
        const x = Math.floor(Math.random() * (y + 1));
        [vetor[y], vetor[x]] = [vetor[x], vetor[y]]; 
    }
}

// Verifica a largura da tela
function medidaDaTela(medida) {
    const medidaMax = matchMedia(`(max-width: ${medida}px)`);

    return medidaMax.matches;
}

// Emite apenas os efeitos sonoros
function tocarEfeitoSonoro(vidas) {
    if (vidas == 0) 
        new Audio('./_media/_sounds/game-over.wav').play();
    else
        new Audio('./_media/_sounds/victory.wav').play();
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
            const imagemRevelada = getComputedStyle(caixa).backgroundImage;

            if (!imagemRevelada.includes(`box_blue.png`)) 
                caixa.style.backgroundImage = "url('_media/_images/box_blue.png')";

            for (let numeroDaImagem = 0; numeroDaImagem < 8; numeroDaImagem++) {
                if (imagemRevelada.includes(`person-${numeroDaImagem}.png`))
                    caixa.style.backgroundImage = imagemRevelada;
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
            const imagemRevelada = getComputedStyle(caixa).backgroundImage;

            if (!imagemRevelada.includes('box_yellow.png'))
                caixa.style.backgroundImage = "url('_media/_images/box_yellow.png')";

            for (let numeroDaImagem = 0; numeroDaImagem < 8; numeroDaImagem++) {
                if (imagemRevelada.includes(`person-${numeroDaImagem}.png`))
                    caixa.style.backgroundImage = imagemRevelada;
            }

            // Remove efeitos de hover do tema escuro
            caixa.addEventListener('mouseenter', evento => evento.target.style.boxShadow = '');
            caixa.addEventListener('mouseleave', evento => evento.target.style.boxShadow = 'none');
        });
    }
}
