// Cria os elementos <button> com a classe 'caixa'
function criarCaixas() {
    const caixasContainer = document.getElementById('caixas');
    
    for (let iter = 0; iter < 20; iter++) {
        const elementoButton = document.createElement('button');
        elementoButton.className = 'caixa';
        caixasContainer.appendChild(elementoButton);
    }

    return document.querySelectorAll('.caixa'); // Seleciona todos as "caixas" criadas
}

// Algoritmo para embaralhar as imagens
function embaralharImagens(imagens) {
    // Adiciona duas vezes os caminhos das imagens ao array, formando pares
    for (let i = 0; i < 2; i++) {
        for (let numeroDaImagem = 0; numeroDaImagem < 10; numeroDaImagem++)
            imagens.unshift(`_media/_images/person-${numeroDaImagem}.png`);
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
        const somDeErro = new Audio('./_media/_sounds/error.ogg');
        somDeErro.volume = 0.7;

        if (acertou)
            new Audio('./_media/_sounds/success.ogg').play();
        else
            somDeErro.play();
    }

    if (venceu != null) {
        if (venceu) 
            new Audio('./_media/_sounds/victory.ogg').play();
        else
            new Audio('./_media/_sounds/game-over.ogg').play();
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
function alternarTema(temaNoturno, body, vetorDeElementos, menu, cabecalho) {
    if (temaNoturno) {
        new Sky().starlit(); // Gerando estrelas iluminadas
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
        new Sky().daytime();
        body.backdropFilter = 'initial';
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
