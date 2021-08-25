let canvas = document.getElementById('snake')

let context = canvas.getContext('2d')

// tamanho de cada quadrado
let box = 32

// cobrinha é um array
let snake = []

// O que vai ter dentro do array - x e y são tamanhos
snake[0] = {
  x: 8 * box,
  y: 8 * box
}

let direction = 'right'

let food = {
  // math.floor remove parte flutuante (0.) ; math.random retorna um número aleatório até 1
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
  context.fillStyle = 'blueviolet'
  // parâmetros - x, y, w, h
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'deepskyblue'
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

function drawFood() {
  context.fillStyle = 'magenta'
  context.fillRect(food.x, food.y, box, box)
}

// pega o movimento do teclado e chama a função update
document.addEventListener('keydown', update)

// !!! Não está indo pra cima
function update(event) {
  // se o número do cód for da direita, ela vai pra direita
  if (event.keyCode == 37 && direction != 'right') direction = 'left'
  if (event.keyCode == 38 && direction != 'down') direction = 'up'
  if (event.keyCode == 39 && direction != 'left') direction = 'right'
  if (event.keyCode == 40 && direction != 'up') direction = 'down'
}

function iniciarJogo() {
  // fazendo a cobrinha aparecer no outro lado da tela (quando atingir o final do canvas, vira zero)
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box

  // parando o jogo se a cobrinha encostar no seu corpo
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo)
      alert('Game over! :(')
    }
  }

  criarBG()
  criarCobrinha()
  drawFood()

  // posição x,y inicial
  let snakeX = snake[0].x
  let snakeY = snake[0].y

  // coordenadas que a cobrinha vai seguir (plano cartesiano)
  if (direction == 'right') snakeX += box
  if (direction == 'left') snakeX -= box
  if (direction == 'up') snakeY -= box
  if (direction == 'down') snakeY += box

  // fazendo a cobrinha comer
  if (snakeX != food.x || snakeY != food.y) {
    // retirando o último elemento do array
    snake.pop()
  } else {
    // food recebe uma posição aleatória
    food.x = Math.floor(Math.random() * 15 + 1) * box
    food.y = Math.floor(Math.random() * 15 + 1) * box
  }

  // criando a cabeça da cobrinha
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

// a cada 100 milisegundos, a função iniciarJogo é renovada
let jogo = setInterval(iniciarJogo, 100)
