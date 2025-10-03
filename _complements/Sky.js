class Sky {
    constructor() {
        this.body = document.querySelector('body');
        this.totalDeEstrelas = numRandom(8, 18);
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
            
            if (estrelaRandomizada == 1) {
                brilhoEstrela.style.backgroundColor = 'rgba(255, 222, 35, .65)';
                brilhoEstrela.style.boxShadow = `2px 2px 25px rgba(255, 222, 35, .3),
                2px 2px 25px rgba(255, 222, 35, .3),
                -2px -2px 25px rgba(255, 222, 35, .3),
                -2px -2px 25px rgba(255, 222, 35, .3),
                1px 1px 22px rgba(255, 222, 35, .5),
                1px 1px 22px rgba(255, 222, 35, .5),
                -1px -1px 22px rgba(255, 222, 35, .5),
                -1px -1px 22px rgba(255, 222, 35, .5),
                0px 0px 20px rgba(255, 222, 35, .65),
                0px 0px 20px rgba(255, 222, 35, .65),
                0px 0px 20px rgba(255, 222, 35, .65),
                0px 0px 20px rgba(255, 222, 35, .65),
                6px 6px 28px rgba(255, 242, 168, 0.4),
                6px 6px 28px rgba(255, 242, 168, .4),
                -6px -6px 28px rgba(255, 242, 168, .4),
                -6px -6px 28px rgba(255, 242, 168, .4)`;
            } else if (estrelaRandomizada == 2) {
                brilhoEstrela.style.backgroundColor = 'rgba(35, 248, 255, 0.65)';
                brilhoEstrela.style.boxShadow = `2px 2px 25px rgba(35, 248, 255, .3),
                2px 2px 25px rgba(35, 248, 255, .3),
                -2px -2px 25px rgba(35, 248, 255, .3),
                -2px -2px 25px rgba(35, 248, 255, .3),
                1px 1px 22px rgba(35, 248, 255, .5),
                1px 1px 22px rgba(35, 248, 255, .5),
                -1px -1px 22px rgba(35, 248, 255, .5),
                -1px -1px 22px rgba(35, 248, 255, .5),
                0px 0px 20px rgba(35, 248, 255, .65),
                0px 0px 20px rgba(35, 248, 255, .65),
                0px 0px 20px rgba(35, 248, 255, .65),
                0px 0px 20px rgba(35, 248, 255, .65),
                6px 6px 28px rgba(145, 251, 255, 0.4),
                6px 6px 28px rgba(145, 251, 255, .4),
                -6px -6px 28px rgba(145, 251, 255, .4),
                -6px -6px 28px rgba(145, 251, 255, .4)`;
            }

            const estrelaContainer = document.createElement('div');
            estrelaContainer.className = 'estrela-container';
            estrelaContainer.appendChild(img);
            estrelaContainer.appendChild(brilhoEstrela);
            
            const tamanhoRandomizado = numRandom(10, 20);
            brilhoEstrela.style.height = `${tamanhoRandomizado - 6}px`;
            brilhoEstrela.style.width = `${tamanhoRandomizado - 6}px`;
            img.style.height = `${tamanhoRandomizado}px`;
            img.style.width = `${tamanhoRandomizado}px`;

            if (tamanhoRandomizado <= 15)
                estrelaContainer.style.zIndex = '-1';
            else
                estrelaContainer.style.zIndex = '1';

            const topRandomizado = numRandom(1, 98);
            estrelaContainer.style.top = `${topRandomizado}%`;

            const leftRandomizado = numRandom(1, 98);
            estrelaContainer.style.left = `${leftRandomizado}%`;

            const atrasoRandomizado = numRandom(3, 10);
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
