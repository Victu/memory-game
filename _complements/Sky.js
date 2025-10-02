class Sky {
    constructor() {
        this.body = document.querySelector('body');
        this.totalDeEstrelas = numRandom(8, 16);
    }

    starlit() {
        const estrelas = document.querySelectorAll('.estrela-container');

        if (estrelas.length > 0) {
            for (let index = 0; index < estrelas.length; index++)
                this.body.removeChild(estrelas[index]);
        }

        for (let quantidade = 5; quantidade <= this.totalDeEstrelas; quantidade++) {
            const brilhoEstrela = document.createElement('div');
            brilhoEstrela.className = 'brilho-estrela';

            const estrelaRandomizada = numRandom(1, 2);
            const img = document.createElement('img');
            img.src = `_media/_images/star-${estrelaRandomizada}.png`;
            
            const estrelaContainer = document.createElement('div');
            estrelaContainer.className = 'estrela-container';
            estrelaContainer.appendChild(img);
            estrelaContainer.appendChild(brilhoEstrela);
            
            const tamanhoRandomizado = numRandom(10, 20);
            brilhoEstrela.style.height = `${tamanhoRandomizado - 6}px`;
            brilhoEstrela.style.width = `${tamanhoRandomizado - 6}px`;
            img.style.height = `${tamanhoRandomizado}px`;
            img.style.width = `${tamanhoRandomizado}px`;

            const zIndexRandomizado = numRandom(-1, 0);
            estrelaContainer.style.zIndex = `${zIndexRandomizado}`;

            const topRandomizado = numRandom(1, 98);
            estrelaContainer.style.top = `${topRandomizado}%`;

            const leftRandomizado = numRandom(1, 98);
            estrelaContainer.style.left = `${leftRandomizado}%`;

            const atrasoRandomizado = numRandom(2, 10);
            estrelaContainer.style.pointerEvents = 'none';
            estrelaContainer.style.animationDelay = `${atrasoRandomizado}s`;
            estrelaContainer.style.animation = 'flutuarEstrela 10s ease-in-out infinite alternate';

            const tempoDeBrilho = numRandom(3, 6);
            brilhoEstrela.style.animationDelay = `${atrasoRandomizado}s`;
            img.style.animationDelay = `${atrasoRandomizado}s`;
            brilhoEstrela.style.animation = `iluminarEstrela ${tempoDeBrilho}s ease infinite alternate-reverse`;
            img.style.animation = `piscarEstrela ${tempoDeBrilho}s ease infinite alternate-reverse, 
            girarEstrela ${numRandom(10, 20)}s ease-in-out infinite alternate-reverse`;
            this.body.appendChild(estrelaContainer);
        }
    }

    daytime() {
        const estrelas = document.querySelectorAll('.estrela-container');

        for (let index = 0; index < estrelas.length; index++)
            this.body.removeChild(estrelas[index]);
    }
}
