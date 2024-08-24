import Game from './src/Game.js'

async function main () {
  const game = new Game()
  await game.start()
}

main()