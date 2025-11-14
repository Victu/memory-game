// Gera efeito de brilho da logo na introdução
function brilharLogomark() {
    const brilhoLogomarkContainer = document.createElement('div');
    brilhoLogomarkContainer.id = 'brilho-logomark-container';
    document.querySelector('main').appendChild(brilhoLogomarkContainer);
}

// Cria os elementos <button> com a classe 'card'
function criarCards() {
    const cardsContainer = document.getElementById('cards');
    
    for (let iter = 0; iter < 20; iter++) {
        const elementoButton = document.createElement('button');
        elementoButton.className = 'card';
        cardsContainer.appendChild(elementoButton);
    }

    return document.querySelectorAll('.card'); // Seleciona tados os "cards" criadas
}

// Cria um elemento para mensagem de combo de acertos
function comboMensagem() {
    document.querySelector('#combo-mensagem')?.remove(); // Verifica se já existe o elemento

    const comboMensagem = document.createElement('span');
    comboMensagem.id = 'combo-mensagem';
    
    document.getElementById('cards').appendChild(comboMensagem);
    
    return comboMensagem;
}

// Cria um elemento para mensagem de "Game Over"
function gameOverMensagem() {
    const gameOverMensagem = document.createElement('div');
    gameOverMensagem.id = 'game-over-msg';

    document.querySelector('main').appendChild(gameOverMensagem);

    return gameOverMensagem;
}

// Algoritmo para embaralhar as imagens
function embaralharImagens(imagens) {
    // Adiciona duas vezes os caminhos das imagens ao array, formando pares
    for (let i = 0; i < 2; i++) {
        for (let numeroDaImagem = 0; numeroDaImagem < 10; numeroDaImagem++)
            imagens.unshift(`_assets/_images/person-${numeroDaImagem}.png`);
    }

    // Randomiza a posição de cada imagem do array
    for (let y = imagens.length - 1; y > 0; y--) {
        const x = Math.floor(Math.random() * (y + 1));
        [imagens[y], imagens[x]] = [imagens[x], imagens[y]]; 
    }
}

// Verifica a largura da tela
function medidaDaTela(medida) {
    const medidaMaxima = matchMedia(`(max-width: ${medida}px)`);

    return medidaMaxima.matches;
}

// Emite os efeitos sonoros no caso de erro, acerto, derrota ou vitória
function tocarEfeitoSonoro(acertou, venceu) {
    if (acertou != null) {
        const somDeErro = new Audio('./_assets/_sounds/error.ogg');
        somDeErro.volume = 0.7;

        if (acertou)
            new Audio('./_assets/_sounds/success.ogg').play();
        else
            somDeErro.play();
    }

    if (venceu != null) {
        if (venceu) 
            new Audio('./_assets/_sounds/victory.ogg').play();
        else
            new Audio('./_assets/_sounds/game-over.ogg').play();
    }
}

// Pausa o andamento do código por um tempo determinado
function pausar(seg) {
    seg *= 1000;

    return new Promise(resolve => setTimeout(resolve, seg));
}

// Retorna um número aleatório
function numRandom(min = 0, max = 1) {
    const numero = Math.floor(Math.random() * (max - min + 1)) + min;

    return numero;
}

// Algoritmo para a alternância dos temas "Noite"/"Dia"
function alternarTema(temaNoturnoAtivado, body, vetorDeElementos, menu, cabecalho) {
    if (temaNoturnoAtivado) {
        new Sky().starlit();
        body.backgroundImage = "url('_assets/_images/bg_night.png')";
        menu.backgroundImage = "url('_assets/_images/bg-3_night.png')";
        cabecalho.backgroundImage = "url('_assets/_images/title-memory-game_night.png')";

        vetorDeElementos.forEach(elemento => {
            const imagemRevelada = getComputedStyle(elemento).backgroundImage;

            if (!imagemRevelada.includes(`box_blue.png`)) 
                elemento.style.backgroundImage = "url('_assets/_images/box_blue.png')";

            for (let numeroDaImagem = 0; numeroDaImagem < 8; numeroDaImagem++) {
                if (imagemRevelada.includes(`person-${numeroDaImagem}.png`))
                    elemento.style.backgroundImage = imagemRevelada;
            }

            // Adiciona efeitos de hover específicos do tema escuro
            elemento.addEventListener('mouseenter', evento => {
                evento.target.style.boxShadow = '-10px 0px 30px var(--card-efeito-noite)',
                '10px 0px 30px var(--card-efeito-noite)',
                '0px -10px 30px var(--card-efeito-noite)',
                '0px 10px 30px var(--card-efeito-noite)';
            });

            elemento.addEventListener('mouseleave', evento => evento.target.style.boxShadow = 'none');
        });
    } else {
        new Sky().clearStars();
        body.backdropFilter = 'initial';
        body.backgroundImage = "url('_assets/_images/bg.png')";
        menu.backgroundImage = "url('_assets/_images/bg-3.png')";
        cabecalho.backgroundImage = "url('_assets/_images/title-memory-game.png')";

        vetorDeElementos.forEach(elemento => {
            const imagemRevelada = getComputedStyle(elemento).backgroundImage;

            if (!imagemRevelada.includes('box_yellow.png'))
                elemento.style.backgroundImage = "url('_assets/_images/box_yellow.png')";

            for (let numeroDaImagem = 0; numeroDaImagem < 8; numeroDaImagem++) {
                if (imagemRevelada.includes(`person-${numeroDaImagem}.png`))
                    elemento.style.backgroundImage = imagemRevelada;
            }

            // Remove efeitos de hover do tema escuro
            elemento.addEventListener('mouseenter', evento => evento.target.style.boxShadow = '');
            elemento.addEventListener('mouseleave', evento => evento.target.style.boxShadow = 'none');
        });
    }
}
