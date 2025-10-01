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

        for (let iter = 5; iter <= this.totalDeEstrelas; iter++) {
            const estrelaRandomizada = numRandom(1, 2);
            const img = document.createElement('img');
            img.src = `_media/_images/star-${estrelaRandomizada}.png`;

            const estrelaContainer = document.createElement('div');
            estrelaContainer.className = 'estrela-container';
            estrelaContainer.appendChild(img);

            const topRandomizado = numRandom(1, 98);
            estrelaContainer.style.top = `${topRandomizado}%`;

            const leftRandomizado = numRandom(1, 98);
            estrelaContainer.style.left = `${leftRandomizado}%`;

            const atrasoRandomizado = numRandom(1, 10);
            estrelaContainer.style.pointerEvents = 'none';
            estrelaContainer.style.animationDelay = `${atrasoRandomizado}s`;
            estrelaContainer.style.animation = 'flutuarEstrela 10s ease-in-out infinite';
            img.style.animation = `piscarEstrela ${numRandom(3, 6)}s ease infinite alternate, girarEstrela ${numRandom(10, 20)}s ease-in-out infinite alternate-reverse`;
            img.style.animationDelay = `${atrasoRandomizado}s`;
            this.body.appendChild(estrelaContainer);
        }
    }

    daytime() {
        const estrelas = document.querySelectorAll('.estrela-container');

        for (let index = 0; index < estrelas.length; index++)
            this.body.removeChild(estrelas[index]);
    }
}
