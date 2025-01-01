import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Menu from '../uiElements/Menu.js'
import Constants from '../globals/Constants.js'
import { Pregame } from '../globals/Images.js'
import Keys from '../globals/Keys.js'
import NewGameDialog from '../components/NewGameDialog.js'
import UIAttributes from '../globals/UIAttributes.js'
import EntityTypes, { Player1, Player2 } from '../globals/EntityTypes.js'
import ImageButton from '../uiElements/ImageButton.js'
import ColorButton from '../uiElements/ColorButton.js'
import { CheatKeys } from '../globals/Debug.js'
import { StartButton, StandardUIBox } from '../globals/UISpriteData.js'
import PlayerImageData from '../globals/PlayerImageData.js'
import { SteveIdleDown } from '../globals/PlayerAnimations.js'
import Colors from '../globals/Colors.js'

export default class PreGameScene extends Scene {
  constructor (config) {
    super(config)

    this.saveSlots = null
    this.startGameMenu = null
    this.showingNewGameDialog = false
    this.showCharacterCreation = false

    this.startGameButton = null
    this.skinToneButtons = []

    this.player1 = {
      colors: {
        skinTone: null,
        hairColor: null,
        shirtColor: null,
        pantsColor: null
      },
      styles: {
        hairStyle: null
       // shirtStyle: null,
       // pantsStyle: null
      },
      images: {
        composite: null,
        body: null,
        hair: null,
        shirt: null,
        pants: null
      }
    }

   /* this.player2 = {
      colors: {
        composite: null,
        skinTone: null,
        hairColor: null,
        shirtColor: null,
        pantsColor: null
      },
      styles: {
        hairStyle: null
      //  shirtStyle: null,
       // pantsStyle: null
      },
      images: {
        body: null,
        hair: null,
        shirt: null,
        pants: null
      }
    }*/
  }

  init (data) {
    super.init(data) // Call the init method of the parent class

    this.backgroundImage = this.imageManager.getImageWithSrc(Pregame)

    // setup resources
    this.saveSlots = this.managers.gameManager.getSaveSlots()
    if (!this.saveSlots) this.saveSlots = []
    this.saveSlots.push('New Game')
    this.startGameMenu = new Menu({
      x: (this.game.canvas.width / (2 * Constants.CanvasScale)) - 65,
      y: this.game.canvas.height / (2 * Constants.CanvasScale),
      game: this.game,
      scene: this,
      options: this.saveSlots,
      textColor: Constants.MainMenuTextColor,
      fontSize: Constants.MainMenuFontSize,
      fontFamily: Constants.MainMenuFontFamily
    })

    window.addEventListener('resize', () => {
      this.startGameMenu.x = (this.game.canvas.width / (2 * Constants.CanvasScale)) - 65
      this.startGameMenu.y = this.game.canvas.height / (2 * Constants.CanvasScale)

      const canvasRect = this.game.canvas.getBoundingClientRect()

      if (this.startGameButton) {
        this.startGameButton.top = `${canvasRect.top + canvasRect.height - 2 * StartButton.height}px`
        this.startGameButton.left = `${canvasRect.left + (canvasRect.width / 2) - StartButton.width}px`  
      }

      if (this.skinToneButtons) {
        this.skinToneButtons.forEach((button, index) => {
          button.top = `${(canvasRect.top + 150) + Math.floor(index / /*4*/ 8) * (2 * StandardUIBox.height)}px`
          button.left = `${canvasRect.left + 392 + (index % /*4*/ 8) * (2 * StandardUIBox.width)}px`
        })  
      }
    })
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
    drawBackground(this)

    if (!this.showingNewGameDialog && !this.showCharacterCreation) {
      this.startGameMenu.draw()
    } else if (this.showCharacterCreation) {
      drawCharacterCreateScreen(this)
    }

    this.imageManager.drawOverlay()
  }

  stop () {
    super.stop() // Call the stop method of the parent class

    // clean up resources
  }

  clicked (selection) {
    if (selection === 'New Game') {
      showNewGameDialog(this)
    } else {
      this.managers.gameManager.loadGame(selection)
      this.game.changeScene(Scenes.Game)
    }
  }

  newGameDialogShowing () {
    this.showingNewGameDialog = true
  }

  newGameDialogDismissed (created) {
    this.showingNewGameDialog = false
    this.showCharacterCreation = created
    if (created) {
      this.startGameButton = buildStartGameButton(this)
      this.startGameButton.hide()
  
      this.skinToneButtons = buildSkinToneButtons(this)
      this.hairColorButtons = buildHairColorButtons(this)
      this.shirtColorButtons = buildShirtColorButtons(this)
      this.pantsColorButtons = buildPantsColorButtons(this)
  
      createPlayerImages(this)
    }
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

function drawBackground (title) {
  title.game.ctx.drawImage(title.backgroundImage, 0, 0, title.game.canvas.width, title.game.canvas.height)
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
  scene.game.ctx.fillText('Create Character', scene.game.canvas.width / 2, (Constants.SceneTitleFontSize / 2) + 50)

  //splitCharacterCreateScreen(scene.game.canvas, scene.game.ctx)
  drawPlayerTitles(scene.game.canvas, scene.game.ctx)
  drawPlayerImageBorders(scene.game.canvas, scene.game.ctx)
  drawCharacterCreateOptions(scene.game.canvas, scene.game.ctx)
  drawPlayerControlsTitles(scene.game.canvas, scene.game.ctx)
  drawPlayerControlsOptions(scene.game.canvas, scene.game.ctx, scene.inputManager.getPlayerControls(Player1)/*, scene.inputManager.getPlayerControls(Player2)*/)

  const borderWidth = scene.game.canvas.width / 8
  const offsetX = 40 + (scene.game.canvas.width / 8)
  const borderY = (1.5 * Constants.SceneTitleFontSize) - 5

  const player1X = (scene.game.canvas.width / 4 - borderWidth / 2 - (offsetX - 40))
  if (scene.player1.images.composite) drawPlayerImage(scene, scene.player1.images.composite, player1X, borderY)

   /* const player2X = (3 * scene.game.canvas.width / 4 - borderWidth / 2 - offsetX)
  if (scene.player2.images.composite) drawPlayerImage(scene, scene.player2.images.composite, player2X, borderY)
*/
  scene.startGameButton.show()
  scene.skinToneButtons.forEach(button => button.show())
  scene.hairColorButtons.forEach(button => button.show())
  scene.shirtColorButtons.forEach(button => button.show())
  scene.pantsColorButtons.forEach(button => button.show())
}

/*function splitCharacterCreateScreen (canvas, ctx) {
  ctx.lineWidth = 2
  ctx.strokeStyle = UIAttributes.UIColor

  // Calculate the middle of the canvas
  const middleX = (canvas.width / 2) - 1

  // Draw the vertical line
  ctx.beginPath()
  ctx.moveTo(middleX, Constants.SceneTitleFontSize - 20)
  ctx.lineTo(middleX, canvas.height - Constants.MainMenuFontSize - 30)
  ctx.stroke()
}*/

function drawPlayerTitles (canvas, ctx) {
  ctx.fillStyle = UIAttributes.UIColor
  ctx.font = `${Constants.MainMenuFontSize}px ${Constants.MainMenuFontFamily}`
  ctx.textAlign = UIAttributes.CenterAlign
  ctx.fillText('', canvas.width / 4, Constants.SceneTitleFontSize)
 // ctx.fillText('Player 2', 3 * canvas.width / 4, Constants.SceneTitleFontSize)
}

function drawPlayerImageBorders (canvas, ctx) {
  // Set the border properties
  ctx.lineWidth = 2
  ctx.strokeStyle = UIAttributes.UIColor

  // Calculate the dimensions and positions
  const borderWidth = canvas.width / 8
  const borderHeight = 2 * borderWidth
  const offsetX = 40 + canvas.width / 8
  const player1X = canvas.width / 4 - borderWidth / 2 - (offsetX - 42)
 // const player2X = 3 * canvas.width / 4 - borderWidth / 2 - offsetX
  const borderY = 1.5 * Constants.SceneTitleFontSize

  // Draw the border for Player 1
  ctx.strokeRect(player1X, borderY, borderWidth, borderHeight)

  // Draw the border for Player 2
  //ctx.strokeRect(player2X, borderY, borderWidth, borderHeight)
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
    'Accessories:',
    'Shirt Color:',
    //'Shirt Style:',
    'Pants Color:',
    //'Pants Style:'
  ]

  // Calculate the positions
  const borderWidth = canvas.width / 8
  const offsetX = canvas.width / 8
  const player1X = canvas.width / 4 - borderWidth / 2 - offsetX
 // const player2X = 3 * canvas.width / 4 - borderWidth / 2 - offsetX
  const borderY = 1.5 * Constants.SceneTitleFontSize + UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize) / 2 // 1.5 * title font size - 1 * UI font size
  const optionsX = player1X + borderWidth + 5 // 5px offset to the right of the border
  const optionsYStart = borderY
  const lineHeight = 2.25 * UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize) // Space between each option

  // Draw the options for Player 1
  options.forEach((option, index) => {
    ctx.fillText(option, optionsX, optionsYStart + index * lineHeight)
  })

  // Draw the options for Player 2
 // const optionsX2 = player2X + borderWidth + 5 // 5px offset to the right of the border
  //options.forEach((option, index) => {
  //  ctx.fillText(option, optionsX2, optionsYStart + index * lineHeight)
  //})
}

function drawPlayerControlsTitles (canvas, ctx) {
  const borderY = (2.75 * canvas.height / 4)

  ctx.fillStyle = UIAttributes.UIColor
  ctx.font = `${Constants.MainMenuFontSize}px ${Constants.MainMenuFontFamily}`
  ctx.textAlign = UIAttributes.CenterAlign
  ctx.fillText('Controls', (canvas.width / 2), borderY)
 // ctx.fillText('Controls', 3 * (canvas.width / 4), borderY)
}

function drawPlayerControlsOptions (canvas, ctx, player1Controls/*, player2Controls*/) {
  const borderWidth = canvas.width / 8
  const offsetX = 40 + canvas.width / 8
  const player1X = canvas.width / 4 - borderWidth / 2 - offsetX
 // const player2X = 3 * canvas.width / 4 - borderWidth / 2 - offsetX
  const borderY = (3 * canvas.height / 4)

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

  const optionsYStart = borderY + 0.25 * UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize)
  const lineHeight = 1.5 * UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize)

  player1Options.forEach((option, index) => {
    if (index < 2) {
      ctx.fillText(option, player1X + 350, optionsYStart + index * lineHeight)
    } else if (index < 4) {
      ctx.fillText(option, player1X + 650, optionsYStart + (index - 2) * lineHeight)
    } else {
      ctx.fillText(option, player1X + 550, optionsYStart + (index - 2) * lineHeight)
    }
  })

 /* const player2Options = [
    `Up: ${player2Controls.Up}`.toUpperCase(),
    `Down: ${player2Controls.Down}`.toUpperCase(),
    `Left: ${player2Controls.Left}`.toUpperCase(),
    `Right: ${player2Controls.Right}`.toUpperCase(),
    `Action: ${player2Controls.Action}`.toUpperCase()
  ]

  player2Options.forEach((option, index) => {
    if (index < 2) {
      ctx.fillText(option, player2X, optionsYStart + index * lineHeight)
    } else if (index < 4) {
      ctx.fillText(option, player2X + 325, optionsYStart + (index - 2) * lineHeight)
    } else {
      ctx.fillText(option, player2X + 235, optionsYStart + (index - 2) * lineHeight)
    }
  })*/
}

function drawPlayerImage (scene, playerImage, playerX, borderY) {
  scene.game.ctx.drawImage(playerImage, playerX, borderY, 10 * SteveIdleDown.frameWidth, 10 * SteveIdleDown.frameHeight)
}

function buildStartGameButton (scene) {
  const canvasRect = scene.game.canvas.getBoundingClientRect()

  const startGameButton = new ImageButton({
    imageManager: scene.managers.imageManager,
    id: 'startGameButton',
    top: `${canvasRect.top + canvasRect.height - 2 * StartButton.height}px`,
    left: `${canvasRect.left + (canvasRect.width / 2) - (StartButton.width)}px`,
    imgDims: StartButton,
    onClick: () => {
      document.body.removeChild(startGameButton.element)
      scene.skinToneButtons.forEach(button => document.body.removeChild(button.element))
      scene.hairColorButtons.forEach(button => document.body.removeChild(button.element))
      scene.shirtColorButtons.forEach(button => document.body.removeChild(button.element))
      scene.pantsColorButtons.forEach(button => document.body.removeChild(button.element))

      scene.game.changeScene(Scenes.Game)
    }
  })

  document.body.appendChild(startGameButton.element)

  return startGameButton
}

function buildSkinToneButtons (scene) {
  const skinToneButtons = []
  const canvasRect = scene.game.canvas.getBoundingClientRect()

  Colors.Skin.forEach((color, index) => {
    const skinToneButton = new ColorButton({
      imageManager: scene.managers.imageManager,
      id: `skinToneButton${color}`,
      top: `${(canvasRect.top + 140) + Math.floor(index / /*4*/ 8) * (2 * StandardUIBox.height)}px`,
      left: `${canvasRect.left + 392 + (index % /*4*/ 8) * (2 * StandardUIBox.width)}px`,
      imgDims: StandardUIBox,
      color: color,
      onClick: () => {
        updatePlayerSkinTone(scene, Player1, color)
      }
    })

    skinToneButtons.push(skinToneButton)
  })

  skinToneButtons.forEach(button => {
    document.body.appendChild(button.element)
    button.hide()
  })

  return skinToneButtons
}

function buildHairColorButtons (scene) {
  const hairColorButtons = []
  const canvasRect = scene.game.canvas.getBoundingClientRect()

  Colors.Hair.forEach((color, index) => {
    const hairColorButton = new ColorButton({
      imageManager: scene.managers.imageManager,
      id: `hairColorButton${color}`,
      top: `${(canvasRect.top + 210) + Math.floor(index / /*6*/ 11) * (2 * StandardUIBox.height)}px`,
      left: `${canvasRect.left + 392 + (index % /*6*/ 11) * (2 * StandardUIBox.width)}px`,
      imgDims: StandardUIBox,
      color: color,
      onClick: () => {
        updatePlayerHairColor(scene, Player1, color)
      }
    })

    hairColorButtons.push(hairColorButton)
  })

  hairColorButtons.forEach(button => {
    document.body.appendChild(button.element)
    button.hide()
  })

  return hairColorButtons
}

function buildShirtColorButtons (scene) {
  const shirColorButtons = []
  const canvasRect = scene.game.canvas.getBoundingClientRect()

  Colors.Shirt.forEach((color, index) => {
    const shirtColorButton = new ColorButton({
      imageManager: scene.managers.imageManager,
      id: `shirtColorButton${color}`,
      top: `${(canvasRect.top + 430) + Math.floor(index / /*4*/ 8) * (2 * StandardUIBox.height)}px`,
      left: `${canvasRect.left + 410 + (index % /*4*/ 8) * (2 * StandardUIBox.width)}px`,
      imgDims: StandardUIBox,
      color: color,
      onClick: () => {
        updatePlayerShirtColor(scene, Player1, color)
      }
    })

    shirColorButtons.push(shirtColorButton)
  })

  shirColorButtons.forEach(button => {
    document.body.appendChild(button.element)
    button.hide()
  })

  return shirColorButtons
}

function buildPantsColorButtons (scene) {
  const pantsColorButtons = []
  const canvasRect = scene.game.canvas.getBoundingClientRect()

  Colors.Pants.forEach((color, index) => {
    const pantsColorButton = new ColorButton({
      imageManager: scene.managers.imageManager,
      id: `pantsColorButton${color}`,
      top: `${(canvasRect.top + 500) + Math.floor(index / /*3*/ 6) * (2 * StandardUIBox.height)}px`,
      left: `${canvasRect.left + 410 + (index % /*3*/ 6) * (2 * StandardUIBox.width)}px`,
      imgDims: StandardUIBox,
      color: color,
      onClick: () => {
        updatePlayerPantsColor(scene, Player1, color)
      }
    })

    pantsColorButtons.push(pantsColorButton)
  })

  pantsColorButtons.forEach(button => {
    document.body.appendChild(button.element)
    button.hide()
  })

  return pantsColorButtons
}

function createPlayerImages (scene) {
  const basePlayerImage = scene.managers.imageManager.getPlayerImage(EntityTypes.Player1)

  scene.player1.images.body = createPlayerBodyImage(scene, basePlayerImage)
 // scene.player2.images.body = createPlayerBodyImage(scene, basePlayerImage)

  scene.player1.images.hair = createPlayerHairImage(scene, basePlayerImage)
//  scene.player2.images.hair = createPlayerHairImage(scene, basePlayerImage)

  scene.player1.images.shirt = createPlayerShirtImage(scene, basePlayerImage)
 // scene.player2.images.shirt = createPlayerShirtImage(scene, basePlayerImage)

  scene.player1.images.pants = createPlayerPantsImage(scene, basePlayerImage)
 // scene.player2.images.pants = createPlayerPantsImage(scene, basePlayerImage)

  scene.player1.images.composite = createCompositePlayerImage(scene.player1)
 // scene.player2.images.composite = createCompositePlayerImage(scene.player2)
}

function createPlayerBodyImage (scene, basePlayerImage) {
  if (!scene.player1.colors.skinTone) scene.player1.colors.skinTone = scene.gameManager.getPlayerColor(Player1, 'Body') // PlayerImageData.Body.baseColor
//  if (!scene.player2.colors.skinTone) scene.player2.colors.skinTone = scene.gameManager.getPlayerColor(Player2, 'Body') // PlayerImageData.Body.baseColor

  const bodyCanvas = document.createElement('canvas')
  const body1Ctx = bodyCanvas.getContext('2d')
  bodyCanvas.width = SteveIdleDown.frameWidth + 2 * SteveIdleDown.padding
  bodyCanvas.height = SteveIdleDown.frameHeight + 2 * SteveIdleDown.padding
  body1Ctx.drawImage(basePlayerImage, 0, 0, bodyCanvas.width, bodyCanvas.height, 0, 0, bodyCanvas.width, bodyCanvas.height)
  body1Ctx.drawImage(basePlayerImage, PlayerImageData.Arms.x, PlayerImageData.Arms.y, bodyCanvas.width, bodyCanvas.height, 0, 0, bodyCanvas.width, bodyCanvas.height)

  return bodyCanvas
}

function createPlayerHairImage (scene, basePlayerImage) {
  if (!scene.player1.colors.hairColor) scene.player1.colors.hairColor = scene.gameManager.getPlayerColor(Player1, 'Hair')
 // if (!scene.player2.colors.hairColor) scene.player2.colors.hairColor = scene.gameManager.getPlayerColor(Player2, 'Hair')

  const hairCanvas = document.createElement('canvas')
  const hairCtx = hairCanvas.getContext('2d')
  hairCanvas.width = SteveIdleDown.frameWidth + 2 * SteveIdleDown.padding
  hairCanvas.height = SteveIdleDown.frameHeight + 2 * SteveIdleDown.padding
  hairCtx.drawImage(basePlayerImage, PlayerImageData.Hair.x, PlayerImageData.Hair.y, hairCanvas.width, hairCanvas.height, 0, 0, hairCanvas.width, hairCanvas.height)

  return hairCanvas
}

function createPlayerShirtImage (scene, basePlayerImage) {
  if (!scene.player1.colors.shirtColor) scene.player1.colors.shirtColor = scene.gameManager.getPlayerColor(Player1, 'Shirt')
 // if (!scene.player2.colors.shirtColor) scene.player2.colors.shirtColor = scene.gameManager.getPlayerColor(Player2, 'Shirt')

  const shirtCanvas = document.createElement('canvas')
  const shirtCtx = shirtCanvas.getContext('2d')
  shirtCanvas.width = SteveIdleDown.frameWidth + 2 * SteveIdleDown.padding
  shirtCanvas.height = SteveIdleDown.frameHeight + 2 * SteveIdleDown.padding
  shirtCtx.drawImage(basePlayerImage, PlayerImageData.Shirt.x, PlayerImageData.Shirt.y, shirtCanvas.width, shirtCanvas.height, 0, 0, shirtCanvas.width, shirtCanvas.height)

  return shirtCanvas
}

function createPlayerPantsImage (scene, basePlayerImage) {
  if (!scene.player1.colors.pantsColor) scene.player1.colors.pantsColor = scene.gameManager.getPlayerColor(Player1, 'Pants')
 // if (!scene.player2.colors.pantsColor) scene.player2.colors.pantsColor = scene.gameManager.getPlayerColor(Player1, 'Pants')

  const pantsCanvas = document.createElement('canvas')
  const pantsCtx = pantsCanvas.getContext('2d')
  pantsCanvas.width = SteveIdleDown.frameWidth + 2 * SteveIdleDown.padding
  pantsCanvas.height = SteveIdleDown.frameHeight + 2 * SteveIdleDown.padding
  pantsCtx.drawImage(basePlayerImage, PlayerImageData.Pants.x, PlayerImageData.Pants.y, pantsCanvas.width, pantsCanvas.height, 0, 0, pantsCanvas.width, pantsCanvas.height)

  return pantsCanvas
}

function createCompositePlayerImage (player) {
  const compositeCanvas = document.createElement('canvas')
  const compositeCtx = compositeCanvas.getContext('2d')
  compositeCanvas.width = SteveIdleDown.frameWidth + 2 * SteveIdleDown.padding
  compositeCanvas.height = SteveIdleDown.frameHeight + 2 * SteveIdleDown.padding
  compositeCtx.drawImage(player.images.body, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
  compositeCtx.drawImage(player.images.hair, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
  compositeCtx.drawImage(player.images.shirt, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
  compositeCtx.drawImage(player.images.pants, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)

  return compositeCanvas
}

function updatePlayerSkinTone (scene, player, newSkinTone) {
  if (player === EntityTypes.Player1) {
    scene.player1.images.body = scene.imageManager.replaceColorInImage(scene.player1.images.body, scene.player1.colors.skinTone, newSkinTone)
    scene.player1.colors.skinTone = newSkinTone
  }/* else {
    scene.player2.images.body = scene.imageManager.replaceColorInImage(scene.player2.images.body, scene.player2.colors.skinTone, newSkinTone)
    scene.player2.images.skinTone = newSkinTone
  }*/

  updateCompositePlayerImage(scene, player)
  scene.gameManager.setPlayerColor(player, 'Body', newSkinTone)
}

function updatePlayerHairColor (scene, player, newHairColor) {
  if (player === EntityTypes.Player1) {
    scene.player1.images.hair = scene.imageManager.replaceColorInImage(scene.player1.images.hair, scene.player1.colors.hairColor, newHairColor)
    scene.player1.colors.hairColor = newHairColor
  } /*else {
    scene.player2.images.hair = scene.imageManager.replaceColorInImage(scene.player2.images.hair, scene.player2.colors.hairColor, newHairColor)
    scene.player2.colors.hairColor = newHairColor
  }*/

  updateCompositePlayerImage(scene, player)
  scene.gameManager.setPlayerColor(player, 'Hair', newHairColor)
}

function updatePlayerShirtColor (scene, player, newShirtColor) {
  if (player === EntityTypes.Player1) {
    scene.player1.images.shirt = scene.imageManager.replaceColorInImage(scene.player1.images.shirt, scene.player1.colors.shirtColor, newShirtColor)
    scene.player1.colors.shirtColor = newShirtColor
  }/* else {
    scene.player2.images.shirt = scene.imageManager.replaceColorInImage(scene.player2.images.shirt, scene.player2.colors.shirtColor, newShirtColor)
    scene.player2.colors.shirtColor = newShirtColor
  }*/

  updateCompositePlayerImage(scene, player)
  scene.gameManager.setPlayerColor(player, 'Shirt', newShirtColor)
}

function updatePlayerPantsColor (scene, player, newPantsColor) {
  if (player === EntityTypes.Player1) {
    scene.player1.images.pants = scene.imageManager.replaceColorInImage(scene.player1.images.pants, scene.player1.colors.pantsColor, newPantsColor)
    scene.player1.colors.pantsColor = newPantsColor
  } /*else {
    scene.player2.images.pants = scene.imageManager.replaceColorInImage(scene.player2.images.pants, scene.player2.colors.pantsColor, newPantsColor)
    scene.player2.colors.pantsColor = newPantsColor
  }*/

  updateCompositePlayerImage(scene, player)
  scene.gameManager.setPlayerColor(player, 'Pants', newPantsColor)
}

function updateCompositePlayerImage (scene, player) {
  if (player === EntityTypes.Player1) {
    const compositeCanvas = scene.player1.images.composite
    const compositeCtx = compositeCanvas.getContext('2d')
    compositeCtx.drawImage(scene.player1.images.body, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player1.images.hair, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player1.images.shirt, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player1.images.pants, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
  }/* else {
    const compositeCanvas = scene.player2.images.composite
    const compositeCtx = compositeCanvas.getContext('2d')
    compositeCtx.drawImage(scene.player2.images.body, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player2.images.hair, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player2.images.shirt, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player2.images.pants, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
  }*/
}