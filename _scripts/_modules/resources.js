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

// Algoritmo para a criação de uma estrela
function criarEstrela() {
    const tipoDeAlternancia = ['alternate-reverse', 'alternate'];
    const estrelaContainer = document.createElement('div'); // Criando container geral da estrela
    estrelaContainer.className = 'estrela-container';
    
    const brilhoEstrela = document.createElement('div'); // Criando container para o efeito de brilho da estela
    brilhoEstrela.className = 'brilho-estrela';

    const estrelaEscolhida = numRandom(1, 2); // Seleciona aleatoriamente entre a estrela amarela e a azul
    const img = document.createElement('img');
    img.src = `_assets/_images/star-${estrelaEscolhida}.png`;
    
    if (estrelaEscolhida == 1) { // Estrela amarela
        brilhoEstrela.style.backgroundColor = 'rgba(255, 219, 14, 0.65)';
        brilhoEstrela.style.boxShadow = `2px 2px 25px rgba(255, 219, 13, 0.65),
        -2px -2px 25px rgba(255, 219, 13, 0.65),
        1px 1px 22px rgba(255, 219, 13, 0.5),
        -1px -1px 22px rgba(255, 219, 13, 0.5),
        0px 0px 20px rgba(255, 222, 13, 0.6),
        0px 0px 20px rgba(255, 222, 13, 0.6),
        6px 6px 28px rgba(255, 242, 35, 0.3),
        -6px -6px 28px rgba(255, 242, 35, 0.3),
        10px -10px 32px rgba(255, 245, 195, 0.35),
        -10px 10px 32px rgba(255, 245, 195, 0.35)`;
    } else if (estrelaEscolhida == 2) { // Estrela azul
        brilhoEstrela.style.backgroundColor = 'rgba(13, 248, 255, 0.65)';
        brilhoEstrela.style.boxShadow = `2px 2px 25px rgba(13, 248, 255, 0.65),
        -2px -2px 25px rgba(13, 248, 255, 0.65),
        1px 1px 22px rgba(13, 248, 255, 0.5),
        -1px -1px 22px rgba(13, 248, 255, 0.5),
        0px 0px 20px rgba(13, 248, 255, 0.6),
        0px 0px 20px rgba(13, 248, 255, 0.6),
        6px 6px 28px rgba(35, 248, 255, 0.3),
        -6px -6px 28px rgba(35, 248, 255, 0.3),
        -10px 10px 32px rgba(195, 255, 255, 0.35),
        10px -10px 32px rgba(195, 255, 255, 0.35)`;
    }

    estrelaContainer.appendChild(img);
    estrelaContainer.appendChild(brilhoEstrela);
    
    const tamanhoRandomizado = numRandom(10, 30);
    brilhoEstrela.style.height = `${tamanhoRandomizado - 17}px`;
    brilhoEstrela.style.width = `${tamanhoRandomizado - 17}px`;
    img.style.height = `${tamanhoRandomizado}px`;
    img.style.width = `${tamanhoRandomizado}px`;
    estrelaContainer.style.zIndex = tamanhoRandomizado <= 26 ? '-1' : '1';
    
    const topRandomizado = numRandom(1, 98);
    estrelaContainer.style.top = `${topRandomizado}%`;

    const leftRandomizado = numRandom(1, 98);
    estrelaContainer.style.left = `${leftRandomizado}%`;

    const tipoEscolhido = tipoDeAlternancia[numRandom(0, 1)];
    estrelaContainer.style.pointerEvents = 'none';
    estrelaContainer.style.animation = 'flutuarEstrela 10s ease-in-out infinite alternate';
    
    const tempoDeBrilho = numRandom(3, 6);
    brilhoEstrela.style.animation = `brilharEstrela ${tempoDeBrilho}s ease infinite ${tipoEscolhido}`;
    img.style.animation = `piscarEstrela ${tempoDeBrilho}s ease infinite ${tipoEscolhido}, 
    girarEstrela ${numRandom(10, 20)}s ease-in-out infinite ${tipoEscolhido}`;
    document.querySelector('body').appendChild(estrelaContainer);
}
