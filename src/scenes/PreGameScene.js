import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Menu from '../uiElements/Menu.js'
import Constants from '../globals/Constants.js'
import Keys from '../globals/Keys.js'
import NewGameDialog from '../components/NewGameDialog.js'
import UIAttributes from '../globals/UIAttributes.js'
import EntityTypes, { Player1, Player2 } from '../globals/EntityTypes.js'
import ImageButton from '../uiElements/ImageButton.js'
import { CheatKeys } from '../globals/Debug.js'
import { StartButton } from '../globals/UISpriteData.js'
import PlayerImageData from '../globals/PlayerImageData.js'
import { SteveIdleDown } from '../globals/Animations.js'

export default class PreGameScene extends Scene {
  constructor (config) {
    super(config)

    this.saveSlots = null
    this.startGameMenu = null
    this.showingNewGameDialog = false
    this.showCharacterCreation = false
    this.startGameButton = null

    this.player1SkinTone = null
    this.player2SkinTone = null
    this.player1Image = null
    this.player2Image = null
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

    this.startGameButton = buildStartGameButton(this)
    this.startGameButton.hide()

    createPlayerImages(this)
  }

  update (deltaTime) {
    super.update(deltaTime) // Call the update method of the parent class

    if (!this.showingNewGameDialog) {
      manageInput(this)
      if (!this.showCharacterCreation) this.startGameMenu.update(deltaTime)
    }
  }

  draw () {
    super.draw() // Call the draw method of the parent class

    if (!this.showingNewGameDialog && !this.showCharacterCreation) {
      this.startGameMenu.draw()
    } else if (this.showCharacterCreation) {
      drawCharacterCreateScreen(this)
    }
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

  newGameDialogShowing () {
    this.showingNewGameDialog = true
  }

  newGameDialogDismissed (created) {
    this.showingNewGameDialog = false
    this.showCharacterCreation = created
  }
}

function manageInput (scene) {
  const justDownKeys = scene.inputManager.getJustDownKeys()

  if (CheatKeys &&  justDownKeys.includes(Keys.C)) {
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
  new NewGameDialog({
    scene: scene
  })
}

function drawCharacterCreateScreen (scene) {
  scene.game.ctx.fillStyle = UIAttributes.UIColor
  scene.game.ctx.font = `${Constants.SceneTitleFontSize}px ${Constants.TitleFontFamily}`
  scene.game.ctx.textAlign = UIAttributes.CenterAlign
  scene.game.ctx.fillText('Create Characters', scene.game.canvas.width / 2, Constants.SceneTitleFontSize / 2)

  splitCharacterCreateScreen(scene.game.canvas, scene.game.ctx)
  drawPlayerTitles(scene.game.canvas, scene.game.ctx)
  drawPlayerImageBorders(scene.game.canvas, scene.game.ctx)
  drawCharacterCreateOptions(scene.game.canvas, scene.game.ctx)
  drawPlayerControlsTitles(scene.game.canvas, scene.game.ctx)
  drawPlayerControlsOptions(scene.game.canvas, scene.game.ctx, scene.inputManager.getPlayerControls(Player1), scene.inputManager.getPlayerControls(Player2))

  if (scene.player1Image) drawPlayerImage(scene, Player1)
  if (scene.player2Image) drawPlayerImage(scene, Player2)

  scene.startGameButton.show()
}

function splitCharacterCreateScreen (canvas, ctx) {
  ctx.lineWidth = 2
  ctx.strokeStyle = UIAttributes.UIColor

  // Calculate the middle of the canvas
  const middleX = (canvas.width / 2) - 1

  // Draw the vertical line
  ctx.beginPath()
  ctx.moveTo(middleX, Constants.SceneTitleFontSize - 20)
  ctx.lineTo(middleX, canvas.height - Constants.MainMenuFontSize - 30)
  ctx.stroke()
}

function drawPlayerTitles (canvas, ctx) {
  ctx.fillStyle = UIAttributes.UIColor
  ctx.font = `${Constants.MainMenuFontSize}px ${Constants.MainMenuFontFamily}`
  ctx.textAlign = UIAttributes.CenterAlign
  ctx.fillText('Player 1', canvas.width / 4, Constants.SceneTitleFontSize)
  ctx.fillText('Player 2', 3 * canvas.width / 4, Constants.SceneTitleFontSize)
}

function drawPlayerImageBorders (canvas, ctx) {
  // Set the border properties
  ctx.lineWidth = 2
  ctx.strokeStyle = UIAttributes.UIColor

  // Calculate the dimensions and positions
  const borderWidth = canvas.width / 8
  const borderHeight = 2 * borderWidth
  const offsetX = 40 + canvas.width / 8
  const player1X = canvas.width / 4 - borderWidth / 2 - offsetX
  const player2X = 3 * canvas.width / 4 - borderWidth / 2 - offsetX
  const borderY = 1.5 * Constants.SceneTitleFontSize

  // Draw the border for Player 1
  ctx.strokeRect(player1X, borderY, borderWidth, borderHeight)

  // Draw the border for Player 2
  ctx.strokeRect(player2X, borderY, borderWidth, borderHeight)
}

function drawCharacterCreateOptions (canvas, ctx) {
  // Set the text properties
  ctx.font = UIAttributes.UIFontSize
  ctx.fillStyle = UIAttributes.UIColor
  ctx.textAlign = UIAttributes.LeftAlign

  // List of options
  const options = [
    'Skin Tone:',
    'Hair Color:',
    'Hair Style:',
    'Shirt Color:',
    'Shirt Style:',
    'Pants Color:',
    'Pants Style:'
  ]

  // Calculate the positions
  const borderWidth = canvas.width / 8
  const offsetX = canvas.width / 8
  const player1X = canvas.width / 4 - borderWidth / 2 - offsetX
  const player2X = 3 * canvas.width / 4 - borderWidth / 2 - offsetX
  const borderY = 1.5 * Constants.SceneTitleFontSize + UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize) / 2 // 1.5 * title font size - 1 * UI font size
  const optionsX = player1X + borderWidth + 5 // 5px offset to the right of the border
  const optionsYStart = borderY
  const lineHeight = 1.5 * UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize) // Space between each option

  // Draw the options for Player 1
  options.forEach((option, index) => {
    ctx.fillText(option, optionsX, optionsYStart + index * lineHeight)
  })

  // Draw the options for Player 2
  const optionsX2 = player2X + borderWidth + 5 // 5px offset to the right of the border
  options.forEach((option, index) => {
    ctx.fillText(option, optionsX2, optionsYStart + index * lineHeight)
  })
}

function drawPlayerControlsTitles (canvas, ctx) {
  const borderY = (1.5 * Constants.SceneTitleFontSize) + (canvas.width / 4) + (2 * UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize))

  ctx.fillStyle = UIAttributes.UIColor
  ctx.font = `${Constants.MainMenuFontSize}px ${Constants.MainMenuFontFamily}`
  ctx.textAlign = UIAttributes.CenterAlign
  ctx.fillText('Controls', canvas.width / 4, borderY)
  ctx.fillText('Controls', 3 * canvas.width / 4, borderY)
}

function drawPlayerControlsOptions (canvas, ctx, player1Controls, player2Controls) {
  const borderWidth = canvas.width / 8
  const offsetX = 40 + canvas.width / 8
  const player1X = canvas.width / 4 - borderWidth / 2 - offsetX
  const player2X = 3 * canvas.width / 4 - borderWidth / 2 - offsetX
  const borderY = (1.5 * Constants.SceneTitleFontSize) + (canvas.width / 4) + (3 * UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize))

  ctx.font = UIAttributes.UIFontSize
  ctx.fillStyle = UIAttributes.UIColor
  ctx.textAlign = UIAttributes.LeftAlign

  const player1Options = [
    `Up: ${player1Controls.Up}`.toUpperCase(),
    `Down: ${player1Controls.Down}`.toUpperCase(),
    `Left: ${player1Controls.Left}`.toUpperCase(),
    `Right: ${player1Controls.Right}`.toUpperCase(),
    `Action: ${player1Controls.Action}`.toUpperCase()
  ]

  const optionsYStart = borderY + UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize) / 2
  const lineHeight = 1.5 * UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize)

  player1Options.forEach((option, index) => {
    ctx.fillText(option, player1X, optionsYStart + index * lineHeight)
  })

  const player2Options = [
    `Up: ${player2Controls.Up}`.toUpperCase(),
    `Down: ${player2Controls.Down}`.toUpperCase(),
    `Left: ${player2Controls.Left}`.toUpperCase(),
    `Right: ${player2Controls.Right}`.toUpperCase(),
    `Action: ${player2Controls.Action}`.toUpperCase()
  ]

  player2Options.forEach((option, index) => {
    ctx.fillText(option, player2X, optionsYStart + index * lineHeight)
  })
}

function drawPlayerImage (scene, player) {
  const borderWidth = scene.game.canvas.width / 8
  const offsetX = 40 + (scene.game.canvas.width / 8)
  const playerX = player === Player1 ? (scene.game.canvas.width / 4 - borderWidth / 2 - offsetX) : (3 * scene.game.canvas.width / 4 - borderWidth / 2 - offsetX)
  const borderY = (1.5 * Constants.SceneTitleFontSize) - 5

  const playerImage = player === Player1 ? scene.player1Image : scene.player2Image
  scene.game.ctx.drawImage(playerImage, playerX, borderY, 10 * SteveIdleDown.frameWidth, 10 * SteveIdleDown.frameHeight)
}

function buildStartGameButton (scene) {
  const borderY = scene.game.canvas.height - Constants.MainMenuFontSize
  const canvasRect = scene.game.canvas.getBoundingClientRect()

  const startGameButton = new ImageButton({
    imageManager: scene.managers.imageManager,
    id: 'startGameButton',
    top: `${canvasRect.top + canvasRect.height - 1.25 * StartButton.height}px`,
    left: `${canvasRect.left + (canvasRect.width / 2) - (StartButton.width)}px`,
    imgDims: StartButton,
    onClick: () => {
      document.body.removeChild(startGameButton.element)

      scene.game.changeScene(Scenes.Game)
    }
  })

  document.body.appendChild(startGameButton.element)

  return startGameButton
}

async function createPlayerImages (scene) {
  if (!scene.player1SkinTone) scene.player1SkinTone = PlayerImageData.Body.baseColor
  if (!scene.player2SkinTone) scene.player2SkinTone = PlayerImageData.Body.baseColor

  const basePlayerImage = scene.managers.imageManager.getPlayerImage(EntityTypes.Player1)

  const body1Canvas = document.createElement('canvas')
  const body1Ctx = body1Canvas.getContext('2d')
  body1Canvas.width = SteveIdleDown.frameWidth + 2 * SteveIdleDown.padding
  body1Canvas.height = SteveIdleDown.frameHeight + 2 * SteveIdleDown.padding
  body1Ctx.drawImage(basePlayerImage, 0, 0, body1Canvas.width, body1Canvas.height, 0, 0, body1Canvas.width, body1Canvas.height)
  body1Ctx.drawImage(basePlayerImage, PlayerImageData.Arms.x, PlayerImageData.Arms.y, body1Canvas.width, body1Canvas.height, 0, 0, body1Canvas.width, body1Canvas.height)

  const body2Canvas = document.createElement('canvas')
  const body2Ctx = body2Canvas.getContext('2d')
  body2Canvas.width = SteveIdleDown.frameWidth + 2 * SteveIdleDown.padding
  body2Canvas.height = SteveIdleDown.frameHeight + 2 * SteveIdleDown.padding
  body2Ctx.drawImage(basePlayerImage, 0, 0, body2Canvas.width, body2Canvas.height, 0, 0, body2Canvas.width, body2Canvas.height)
  body2Ctx.drawImage(basePlayerImage, PlayerImageData.Arms.x, PlayerImageData.Arms.y, body2Canvas.width, body2Canvas.height, 0, 0, body2Canvas.width, body2Canvas.height)

  scene.player1Image = body1Canvas // bodyImage
  scene.player2Image = body2Canvas // bodyImage
}

async function updatePlayerSkinTone (scene, player, newSkinTone) {
  if (player === EntityTypes.Player1) {
    scene.player1SkinTone = newSkinTone
    scene.player1Image = await createPlayerImage(scene, player)
  } else {
    scene.player2SkinTone = newSkinTone
    scene.player2Image = await createPlayerImage(scene, player)
  }
}