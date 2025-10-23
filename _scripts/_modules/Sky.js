class Sky {
    constructor() {
        this.body = document.querySelector('body');
        this.totalDeEstrelas = numRandom(8, 18);
    }

    // Cria animação de céu estrelado
    starlit() {
        const estrelas = document.querySelectorAll('.estrela-container');
        const tipoDeAlternancia = ['alternate-reverse', 'alternate'];

        if (estrelas.length > 0) estrelas = [];

        // Laço para a criação das estrelas
        for (let quantidade = 5; quantidade <= this.totalDeEstrelas; quantidade++) {
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
            
            const tamanhoRandomizado = numRandom(22, 28);
            brilhoEstrela.style.height = `${tamanhoRandomizado - 17}px`;
            brilhoEstrela.style.width = `${tamanhoRandomizado - 17}px`;
            img.style.height = `${tamanhoRandomizado}px`;
            img.style.width = `${tamanhoRandomizado}px`;

            if (tamanhoRandomizado <= 26)
                estrelaContainer.style.zIndex = '-1';
            else
                estrelaContainer.style.zIndex = '1';

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
            this.body.appendChild(estrelaContainer);
        }
    }

    // Remove todas as estrelas
    clearStars() {
        const estrelas = document.querySelectorAll('.estrela-container');

        estrelas.forEach(estrela => estrela?.remove()); // Remove cada elemento da classe ".estrela-container"
    }
}
