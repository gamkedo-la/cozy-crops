import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Menu from '../uiElements/Menu.js'
import Constants from '../globals/Constants.js'
import Keys from '../globals/Keys.js'

export default class PreGameScene extends Scene {
  constructor (config) {
    super(config)

    this.saveSlots = null
    this.startGameMenu = null
    this.showingNewGameDialog = false
  }

  start () {
    super.start() // Call the start method of the parent class

    // setup resources
    this.saveSlots = this.managers.gameManager.getSaveSlots()
    if (!this.saveSlots) this.saveSlots = []
    this.saveSlots.push('New Game')
    this.startGameMenu = new Menu({
      x: (this.game.canvas.width / (2 * Constants.CanvasScale)) - 15,
      y: this.game.canvas.height / (2 * Constants.CanvasScale),
      game: this.game,
      scene: this,
      options: this.saveSlots,
      textColor: Constants.MainMenuTextColor,
      fontSize: Constants.MainMenuFontSize,
      fontFamily: Constants.MainMenuFontFamily
    })
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    if (!this.showingNewGameDialog) {
      manageInput(this)
      this.startGameMenu.update(deltaTime)
    }
  }

  draw () {
    super.draw() // Call the draw method of the parent class

    this.startGameMenu.draw()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  async clicked (selection) {
    if (selection === 'New Game') {
      showNewGameDialog(this)
    } else {
      this.managers.gameManager.loadGame(selection)
      await this.game.changeScene(Scenes.Game)
    }
  }
}

function manageInput (scene) {
  const justDownKeys = scene.inputManager.getJustDownKeys()

  if (justDownKeys.includes(Keys.C)) {
    const saveSlots = scene.managers.gameManager.getSaveSlots()
    for (const slot of saveSlots) {
      scene.gameManager.clearSaveSlot(slot)
    }

    scene.saveSlots = ['New Game']
    scene.startGameMenu = new Menu({
      x: (scene.game.canvas.width / (2 * Constants.CanvasScale)) - 15,
      y: scene.game.canvas.height / (2 * Constants.CanvasScale),
      game: scene.game,
      scene: scene,
      options: scene.saveSlots,
      textColor: Constants.MainMenuTextColor,
      fontSize: Constants.MainMenuFontSize,
      fontFamily: Constants.MainMenuFontFamily
    })
  }
}

function showNewGameDialog (scene) {
  scene.inputManager.ignoreInput(true)
  scene.showingNewGameDialog = true

  const shadow = document.createElement('div')
  shadow.id = 'shadow'
  shadow.style.position = 'absolute'
  shadow.style.left = '0px'
  shadow.style.top = '0px'
  shadow.style.width = '100%'
  shadow.style.height = '100%'
  shadow.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  shadow.style.zIndex = '50'

  document.body.appendChild(shadow)

  const container = document.createElement('div')
  container.id = 'container'
  container.style.position = 'absolute'

  const canvasRect = scene.game.canvas.getBoundingClientRect()
  const containerWidth = 400
  const containerHeight = 125
  container.style.left = `${canvasRect.left + (canvasRect.width / 2) - containerWidth / 2}px`
  container.style.top = `${canvasRect.top + (canvasRect.height / 2) - containerHeight / 2}px`
  container.style.width = `${containerWidth}px`
  container.style.height = `${containerHeight}px`

  container.style.backgroundColor = 'white'
  container.style.border = '2px solid black'
  container.style.borderRadius = '10px'
  container.style.zIndex = '99'

  document.body.appendChild(container)

  const slotName = document.createElement('input')
  slotName.type = 'text'
  slotName.id = 'slotName'
  slotName.placeholder = 'Enter the name of your farm...'
  slotName.style.position = 'absolute'
  const inputWidth = containerWidth - 20
  const inputHeight = 40
  slotName.style.left = `${canvasRect.left + (canvasRect.width / 2) - (inputWidth / 2) - 2}px`
  slotName.style.top = `${canvasRect.top + (canvasRect.height / 2) - (containerHeight / 2) + 10}px`
  slotName.style.width = `${inputWidth}px`
  slotName.style.height = `${inputHeight}px`
  slotName.style.fontSize = '16px'
  slotName.style.textAlign = 'left'
  slotName.style.border = '2px solid black'
  slotName.style.borderRadius = '5px'
  slotName.style.backgroundColor = 'white'
  slotName.style.color = 'black'
  slotName.style.zIndex = '100'
  slotName.style.display = 'block'

  const startButton = document.createElement('button')
  startButton.id = 'startButton'
  startButton.innerText = 'Start'
  startButton.style.position = 'absolute'
  const buttonWidth = 100
  const buttonHeight = 50
  startButton.style.left = `${canvasRect.left + (canvasRect.width / 2) - (buttonWidth / 2)}px`
  startButton.style.top = `${canvasRect.top + (canvasRect.height / 2) + (containerHeight / 2) - (buttonHeight) - 8}px`
  startButton.style.width = `${buttonWidth}px`
  startButton.style.height = `${buttonHeight}px`
  startButton.style.fontSize = '24px'
  startButton.style.textAlign = 'center'
  startButton.style.border = '2px solid black'
  startButton.style.borderRadius = '5px'
  startButton.style.backgroundColor = 'blue'
  startButton.style.color = 'white'
  startButton.style.zIndex = '100'
  startButton.style.display = 'block'

  document.body.appendChild(slotName)
  document.body.appendChild(startButton)

  startButton.onclick = async () => {
    scene.inputManager.ignoreInput(false)
    scene.showingNewGameDialog = false

    console.log('Starting new game...')

    const slotName = document.getElementById('slotName').value

    scene.managers.gameManager.saveSaveSlot(slotName)
    scene.managers.gameManager.loadGame(slotName)
    await scene.game.changeScene(Scenes.Game)

    document.body.removeChild(document.getElementById('slotName'))
    document.body.removeChild(document.getElementById('startButton'))
    document.body.removeChild(document.getElementById('container'))
    document.body.removeChild(document.getElementById('shadow'))
  }
}