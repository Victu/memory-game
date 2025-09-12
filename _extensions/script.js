// --------------------------- Configurações do conteúdo principal ---------------------------------

const body = document.getElementsByTagName('body')[0].style // Seleciona o elemento <body> do documento
const caixas = document.querySelectorAll('.caixa') // Seleciona todas as botões com a classe 'caixa'
const imagens = Array() // Array que armazenará os caminhos das imagens dos personagens
var imagens_reveladas = Array() // Array para armazenar imagens reveladas no clique
var caixas_selecionadas = Array() // Array para armazenar as caixas que foram clicadas
var numero_de_vidas = document.getElementById('numero-de-vidas')
var total_vidas = 5 // Quantidade atual de vidas
var acertos = 0 // Variável para contar os acertos  
const game_over_msg = document.getElementById('game-over-msg')
const vida_retirada = document.getElementById('vida-retirada')
var add = 0 

// Adiciona duas vezes os caminhos das imagens ao array, formando pares
while (add < 2) {
    for (let numero_da_imagem = 0; numero_da_imagem < 8; numero_da_imagem++)
        imagens.push(`_media/_images/person-${numero_da_imagem}.png`)

    add++
}

// Embaralha o array de imagens 
embaralharVetor(imagens)

// Animação da introdução
document.addEventListener('DOMContentLoaded', () => {
    caixas.forEach(caixa => { caixa.style.transform = 'translateX(60vw)'})

    // Ação do botão "Começar"
    document.getElementById('start').addEventListener('click', async () => {
        document.getElementById('intro').style.display = 'none'
        document.getElementById('cabecalho-principal').style.visibility = 'visible'
        document.getElementById('caixas').style.display = 'grid'

        for (const caixa of caixas) {
            caixa.style.visibility = 'visible';
            caixa.style.opacity = '1';
            caixa.style.transform = ''
            caixa.style.pointerEvents = 'none'

            await new Promise(resolve => setTimeout(resolve, 250))
        }

        caixas.forEach(caixa => caixa.style.pointerEvents = 'auto') 
    })
})

// Associa o evento de clique a cada caixa
caixas.forEach((elemento, index) => {
    elemento.addEventListener('click', caixa => {
        let reiniciar = null
                
        // Exibe a imagem correspondente à posição embaralhada
        caixa.target.style.backgroundImage = `url('${imagens[index]}')`
        caixa.target.style.filter = 'initial'
        caixa.target.style.transform = 'initial'
        caixa.target.style.pointerEvents = 'none'
        caixa.target.style.border = '5px silver groove'
        vida_retirada.style.transform = ''
        
        // Guarda imagem e caixa selecionada
        imagens_reveladas.unshift(imagens[index])
        caixas_selecionadas.unshift(caixa.target)

        // Quando duas imagens são reveladas
        if (imagens_reveladas.length == 2) {
            if (imagens_reveladas[0] !== imagens_reveladas[1]) {
                total_vidas--
                new Audio('./_media/_sounds/error.mp3').play()
                setTimeout(() => vida_retirada.style.visibility = 'hidden', 300)

                vida_retirada.style.visibility = 'visible'
                vida_retirada.style.transform = 'translateY(-150px)'
                vida_retirada.innerText = '-1 vida'
                
                // Se forem diferentes, desativa temporariamente os cliques
                caixas.forEach(objeto => objeto.style.pointerEvents = 'none')

                caixas_selecionadas[1].style.transform = 'initial'
                numero_de_vidas.innerHTML = `${total_vidas}`
                numero_de_vidas.style.animation = 'mudaCor 0.3s linear 3'

                // Após um tempo, reseta as caixas para o estado inicial
                setTimeout(() => {
                    for (const caixa_selecionada of caixas_selecionadas) {
                        // Define imagem de fundo conforme o tema
                        if (!tema_alternado)
                            caixa_selecionada.style.backgroundImage = `url('_media/_images/box_yellow.png')`
                        else
                            caixa_selecionada.style.backgroundImage = `url('_media/_images/box_blue.png')`

                        caixa_selecionada.style.cursor = 'pointer'

                        setTimeout(() => caixa_selecionada.style.pointerEvents = 'auto', 450)

                        caixa_selecionada.style.transform = 'rotate(-360deg)'
                        caixa_selecionada.style.boxShadow = 'none'
                        
                        // Restaura efeitos de hover
                        caixa_selecionada.addEventListener('mouseenter', evento => {
                            evento.target.style.filter = ''
                            evento.target.style.transform = ''

                            if (!tema_alternado)
                                evento.target.style.boxShadow = ''
                            else
                                evento.target.style.boxShadow = '-10px 0px 30px rgba(0, 60, 255, 0.8), 10px 0px 30px rgba(0, 60, 255, 0.8)',
                                '0px -10px 30px rgba(0, 60, 255, 0.8), 0px 10px 30px rgba(0, 60, 255, 0.8)'
                        })

                        caixa_selecionada.addEventListener('mouseleave', evento => {
                            evento.target.style.filter = ''
                            evento.target.style.transform = ''
                        })
                    }

                    // Reativa o clique nas caixas que ainda não foram resolvidas
                    caixas.forEach(objeto => {
                        objeto.style.border = 'none'
                        const cor_da_caixa = getComputedStyle(objeto).backgroundImage

                        if (cor_da_caixa.includes('box_yellow.png') || cor_da_caixa.includes('box_blue.png'))
                            objeto.style.pointerEvents = 'auto'
                    })

                    // Limpa os arrays
                    imagens_reveladas = Array()
                    caixas_selecionadas = Array()
                    numero_de_vidas.style.animation = 'initial'

                    if (total_vidas == 0) {
                        setTimeout(() => {
                            tocarAudio(total_vidas)
                            document.querySelector('#cabecalho-principal > figure').style.display = 'none'
                            game_over_msg.innerHTML = 'Game<br><br>Over'
                            game_over_msg.style.color = 'rgba(255, 50, 50, 0.9)'
                            game_over_msg.style.visibility = 'visible'
                            game_over_msg.style.opacity = 1
                            game_over_msg.style.animation = 'piscarMsg 0.6s ease-in-out infinite'
                        }, 1100)
                        
                        setTimeout(() => {
                            reiniciar = confirm('Deseja reiniciar?')

                            if (reiniciar) location.reload()
                        }, 3600)
                        
                        caixas.forEach(objeto => {
                            objeto.style.opacity = '0'
                            objeto.style.visibility = 'hidden'
                            objeto.style.transform = 'rotate(-360deg)'
                        })
                    }        
                }, 800)
            } else {
                acertos++
                new Audio('./_media/_sounds/success.mp3').play()

                // Se as imagens forem iguais (par encontrado), esconde as caixas
                caixas.forEach(objeto => objeto.style.pointerEvents = 'none')
                caixas_selecionadas[0].style.transform = 'initial'
                caixas_selecionadas[1].style.transform = 'initial'

                // Após um tempo, faz as caixas desaparecerem
                setTimeout(() => {
                    for (const caixa_selecionada of caixas_selecionadas) {
                        caixa_selecionada.style.transform = 'translateY(-160px)'
                        caixa_selecionada.style.transition = '0.7s'
                        caixa_selecionada.style.opacity = '0'
                        caixa_selecionada.style.visibility = 'hidden'
                    }

                    // Reativa cliques nas caixas não resolvidas
                    caixas.forEach(objeto => {
                        const cor_da_caixa = getComputedStyle(objeto).backgroundImage

                        if (cor_da_caixa.includes('box_yellow.png') || cor_da_caixa.includes('box_blue.png'))
                            objeto.style.pointerEvents = 'auto'
                    })

                    // Limpa os arrays
                    imagens_reveladas = Array()
                    caixas_selecionadas = Array()

                    if (acertos == 8) {
                        acertos = 0

                        setTimeout(() => {
                            tocarAudio(total_vidas)
                            document.querySelector('#cabecalho-principal > figure').style.display = 'none'
                            game_over_msg.innerHTML = 'You<br><br>Win!'
                            game_over_msg.style.marginLeft = '4rem'
                            game_over_msg.style.color = 'lime'
                            game_over_msg.style.visibility = 'visible'
                            game_over_msg.style.opacity = 1
                            game_over_msg.style.animation = 'piscarMsg 0.6s ease-in-out infinite'
                        }, 1100)

                        setTimeout(() => alert('Você conseguiu finalizar!'), 3600);
                    }
                }, 1000)
            }
        }
    })
})

// ------------------------------- Menu lateral e submenus -------------------------------------

const botao_menu_lateral = document.getElementById('botao-menu-lateral') // Seleciona o botão responsável por mostrar/ocultar o menu lateral
const main = document.getElementsByTagName('main')[0].style // Seleciona o elemento <main> do documento
const seta_botao = document.getElementById('seta-botao').style // Seleciona o estilo da seta do botão de menu
const menu_lateral = document.getElementById('menu-lateral').style // Seleciona o menu lateral
const cabecalho_menu_lateral = document.getElementById('cabecalho-menu-lateral').style
const sub_menu_temas = document.getElementById('sub-menu-temas').style
const sub_menu_dificuldade = document.getElementById('sub-menu-dificuldade').style
var menu_visivel = true // Variável para controlar a visibilidade do menu lateral     
var tema_alternado = false // Variável para controlar o tema

// Mostra ou oculta o menu lateral
botao_menu_lateral.addEventListener('click', evento => {
    if (!menu_visivel) {
        // Ao fechar o menu
        if (medidaDaTela(1230)) {
            main.transform = 'initial'
            main.transition = '0.5s'
        }

        menu_lateral.transform = 'translateX(-100%)'
        menu_lateral.transition = '0.5s'
        evento.target.style.transform = ''
        evento.target.style.transition = '0.5s'
        evento.target.title = 'Abrir menu'
        seta_botao.transform = 'initial'
        seta_botao.transition = '0.4s'
        menu_visivel = true  
    } else {
        // Ao abrir o menu
        if (medidaDaTela(1230)){
            main.transform = 'translateX(215px)'
            main.transition = '0.5s'
        }

        menu_lateral.transform = 'initial'
        menu_lateral.transition = '0.5s'
        evento.target.style.transform = 'translateX(60px)'
        evento.target.style.transition = '0.5s'
        evento.target.title = 'Fechar menu'
        seta_botao.transform = 'rotate(180deg)'
        seta_botao.transition = '0.4s'
        menu_visivel = false
    }
})

// Botão para o submenu de temas
document.getElementById('botao-temas').addEventListener('mouseenter', evento => {
    sub_menu_dificuldade.transition = '0.4s'
    sub_menu_dificuldade.transform = 'scaleY(0)'
    sub_menu_temas.transition = '0.2s'
    sub_menu_temas.transform = 'scaleY(1)'

    evento.target.addEventListener('mouseleave', () => {
        sub_menu_temas.transition = '0.4s'
        sub_menu_temas.transform = 'scaleY(0)'
    })
})

// Ativa o tema escuro
document.getElementById('noite').addEventListener('click', () => {
    tema_alternado = true
    
    body.backgroundImage = "url('_media/_images/bg_night.png')"
    menu_lateral.backgroundImage = "url('_media/_images/bg-3_night.png')"
    cabecalho_menu_lateral.backgroundImage = "url('_media/_images/title-memory-game_night.png')"

    caixas.forEach(caixa => {
        const imagem_revelada = getComputedStyle(caixa).backgroundImage

        if (!imagem_revelada.includes(`box_blue.png`)) 
            caixa.style.backgroundImage = "url('_media/_images/box_blue.png')"

        for (let numero_da_imagem = 0; numero_da_imagem < 8; numero_da_imagem++) {
            if (imagem_revelada.includes(`person-${numero_da_imagem}.png`))
                caixa.style.backgroundImage = imagem_revelada
        }

        // Adiciona efeitos de hover específicos do tema escuro
        caixa.addEventListener('mouseenter', evento => {
            evento.target.style.boxShadow = '-10px 0px 30px rgba(0, 60, 255, 0.8), 10px 0px 30px rgba(0, 60, 255, 0.8)',
            '0px -10px 30px rgba(0, 60, 255, 0.8), 0px 10px 30px rgba(0, 60, 255, 0.8)'
        })

        caixa.addEventListener('mouseleave', evento => evento.target.style.boxShadow = 'none')
    })
})

// Ativa o tema claro
document.getElementById('dia').addEventListener('click', () => {
    tema_alternado = false
    
    body.backgroundImage = "url('_media/_images/bg.png')"
    menu_lateral.backgroundImage = "url('_media/_images/bg-3.png')"
    cabecalho_menu_lateral.backgroundImage = "url('_media/_images/title-memory-game.png')"
    
    caixas.forEach(caixa => {
        const imagem_revelada = getComputedStyle(caixa).backgroundImage

        if (!imagem_revelada.includes('box_yellow.png'))
            caixa.style.backgroundImage = "url('_media/_images/box_yellow.png')"

        for (let numero_da_imagem = 0; numero_da_imagem < 8; numero_da_imagem++) {
            if (imagem_revelada.includes(`person-${numero_da_imagem}.png`))
                caixa.style.backgroundImage = imagem_revelada
        }

        // Remove efeitos de hover do tema escuro
        caixa.addEventListener('mouseenter', evento => evento.target.style.boxShadow = '')
        caixa.addEventListener('mouseleave', evento => evento.target.style.boxShadow = 'none')
    })
})

// Botão para o submenu dificuldade
document.getElementById('botao-dificuldade').addEventListener('mouseenter', evento => {
    sub_menu_temas.transition = '0.4s'
    sub_menu_temas.transform = 'scaleY(0)'
    sub_menu_dificuldade.transition = '0.2s'
    sub_menu_dificuldade.transform = 'scaleY(1)'

    evento.target.addEventListener('mouseleave', () => {
        sub_menu_dificuldade.transition = '0.4s'
        sub_menu_dificuldade.transform = 'scaleY(0)'
    })
})

document.querySelectorAll('#sub-menu-dificuldade > li').forEach(texto => {
    texto.addEventListener('click', () => {
        if (texto.innerText == 'Fácil') {
            total_vidas = 8
            numero_de_vidas.innerText = `${total_vidas}`
        } else if (texto.innerText == 'Médio') {
            total_vidas = 5
            numero_de_vidas.innerText = `${total_vidas}`
        } else {
            total_vidas = 3
            numero_de_vidas.innerText = `${total_vidas}`
        }

        menu_visivel = true
        seta_botao.transform = 'initial'
        seta_botao.transition = '0.4s'
        menu_lateral.transform = 'translateX(-100%)'
        menu_lateral.transition = '0.5s'
        sub_menu_dificuldade.transition = '0.4s'
        sub_menu_dificuldade.transform = 'scaleY(0)'

        alert(`Nível ${texto.innerHTML.toUpperCase()}: ${total_vidas} vidas`)
    })
})

document.getElementById('botao-sobre').addEventListener('click', () => {
    const sobre = document.getElementById('sobre').style

    if (sobre.display != 'block')
        sobre.display = 'block'
    else
        sobre.display = 'none'
})

document.getElementById('fechar-sobre').addEventListener('click', () => {
    document.getElementById('sobre').style.display = 'none'
})

function sair() {
    let confirmado = confirm('Tem certeza que deseja sair?')

    if (confirmado) close()
}

// --------------------------------------------------------------------------------------------------

// Algoritmo para embaralhar vetor
function embaralharVetor(vetor) {
    for (let y = vetor.length - 1; y > 0; y--) {
        const x = Math.floor(Math.random() * (y + 1));
        [vetor[y], vetor[x]] = [vetor[x], vetor[y]] 
    }
}

function medidaDaTela(medida) {
    const medida_max = matchMedia(`(max-width: ${medida}px)`)

    return medida_max.matches
}

function tocarAudio(vidas) {
    if (vidas == 0) 
        new Audio('./_media/_sounds/game-over.wav').play()
    else
        new Audio('./_media/_sounds/victory.wav').play()
}
