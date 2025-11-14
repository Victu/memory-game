class Sky {
    constructor() {
         this.totalDeEstrelas = numRandom(10, 20);
    }

    // Inicia animação de céu estrelado
    starlit() {
        const estrelas = document.querySelectorAll('.estrela-container');

        if (estrelas.length > 0) estrelas = [];

        // Laço para gerar cada estrela
        for (let quantidade = 5; quantidade <= this.totalDeEstrelas; quantidade++) criarEstrela();
    }

    // Remove todas as estrelas
    clearStars() {
        const estrelas = document.querySelectorAll('.estrela-container');

        estrelas.forEach(estrela => estrela?.remove()); // Verifica existência e remove cada elemento da classe ".estrela-container"
    }
}
