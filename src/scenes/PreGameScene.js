import Scene from './Scene.js'
import Scenes from '../globals/Scenes.js'
import Menu from '../uiElements/Menu.js'
import Constants from '../globals/Constants.js'
import { BasePlayer, Pregame } from '../globals/Images.js'
import Keys from '../globals/Keys.js'
import NewGameDialog from '../components/NewGameDialog.js'
import UIAttributes from '../globals/UIAttributes.js'
import EntityTypes, { Player1, Player2 } from '../globals/EntityTypes.js'
import ImageButton from '../uiElements/ImageButton.js'
import ColorButton from '../uiElements/ColorButton.js'
import StyleButton from '../uiElements/StyleButton.js'
import StartGameButton from '../uiElements/StartGameButton.js'
import { CheatKeys } from '../globals/Debug.js'
import { StartButton, StandardUIBox } from '../globals/UISpriteData.js'
import PlayerImageData, { PlayerHairData, PlayerAccessoriesData } from '../globals/PlayerImageData.js'
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
    this.hairColorButtons = []
    this.hairStyleButtons = []
    this.accessoriesButtons = []
    this.shirtColorButtons = []
    this.pantsColorButtons = []

    this.player1 = {
      colors: {
        skinTone: PlayerImageData.Body.baseColor,
        hairColor: PlayerImageData.Hair.baseColor,
        shirtColor: PlayerImageData.Shirt.baseColor,
        pantsColor: PlayerImageData.Pants.baseColor
      },
      styles: {
        hairStyle: PlayerHairData.Default,
        accessories: null
       // shirtStyle: null,
       // pantsStyle: null
      },
      images: {
        composite: null,
        body: null,
        accessories: null,
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
        this.startGameButton.top = Math.floor(canvasRect.top + canvasRect.height - 2 * StartButton.height)
        this.startGameButton.left = Math.floor(canvasRect.left + (canvasRect.width / 2) - StartButton.width)  
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
      // this.startGameButton.hide()
  
      const canvasRect = this.game.canvas.getBoundingClientRect()
      this.skinToneButtons = buildSkinToneButtons(this, canvasRect)
      this.hairColorButtons = buildHairColorButtons(this, canvasRect)
      this.shirtColorButtons = buildShirtColorButtons(this, canvasRect)
      this.pantsColorButtons = buildPantsColorButtons(this, canvasRect)
      this.hairStyleButtons = buildHairStyleButtons(this, canvasRect)
      this.accessoriesButtons = buildAccessoriesButtons(this, canvasRect)
  
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

  if (scene.showCharacterCreation) {
    const mousePos = scene.game.inputManager.getMousePosition()
    if (mousePos.justDown) {
      if(scene.startGameButton.checkClicked(mousePos.x, mousePos.y)) {
        scene.startGameButton.activate()
      }

      scene.skinToneButtons.forEach(button => {
        if (button.checkClicked(mousePos.x, mousePos.y)) {
          button.activate()
        }
      })

      scene.hairColorButtons.forEach(button => {
        if (button.checkClicked(mousePos.x, mousePos.y)) {
          button.activate()
        }
      })

      scene.hairStyleButtons.forEach(button => {
        if (button.checkClicked(mousePos.x, mousePos.y)) {
          button.activate()
        }
      })

      scene.accessoriesButtons.forEach(button => {
        if (button.checkClicked(mousePos.x, mousePos.y)) {
          button.activate()
        }
      })

      scene.shirtColorButtons.forEach(button => {
        if (button.checkClicked(mousePos.x, mousePos.y)) {
          button.activate()
        }
      })

      scene.pantsColorButtons.forEach(button => {
        if (button.checkClicked(mousePos.x, mousePos.y)) {
          button.activate()
        }
      })
    }
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

  const borderY = (1.5 * Constants.SceneTitleFontSize) - 5

  if (scene.player1.images.composite) drawPlayerImage(scene, scene.player1.images.composite, 86, borderY)

  // const player2X = (3 * scene.game.canvas.width / 4 - borderWidth / 2 - offsetX)
  // if (scene.player2.images.composite) drawPlayerImage(scene, scene.player2.images.composite, player2X, borderY)

  scene.skinToneButtons.forEach(button => button.draw())
  scene.hairColorButtons.forEach(button => button.draw())
  scene.hairStyleButtons.forEach(button => button.draw())
  scene.accessoriesButtons.forEach(button => button.draw())
  scene.shirtColorButtons.forEach(button => button.draw())
  scene.pantsColorButtons.forEach(button => button.draw())
  scene.startGameButton.draw()
}

// function splitCharacterCreateScreen (canvas, ctx) {
//   ctx.lineWidth = 2
//   ctx.strokeStyle = UIAttributes.UIColor

//   // Calculate the middle of the canvas
//   const middleX = (canvas.width / 2) - 1

//   // Draw the vertical line
//   ctx.beginPath()
//   ctx.moveTo(middleX, Constants.SceneTitleFontSize - 20)
//   ctx.lineTo(middleX, canvas.height - Constants.MainMenuFontSize - 30)
//   ctx.stroke()
// }

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
  const player1X = 90
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
  const optionsX = player1X + borderWidth + 35 // 5px offset to the right of the border
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

  const startGameButton = new StartGameButton({
    scene,
    imageManager: scene.managers.imageManager,
    id: 'startGameButton',
    top: Math.floor(canvasRect.height - 4.25 * StartButton.height),
    left: Math.floor((canvasRect.width / 2) - (StartButton.width)),
    imgDims: StartButton,
    action: () => {
      scene.game.changeScene(Scenes.Game)
    }
  })

  return startGameButton
}

function buildSkinToneButtons (scene, canvasRect) {
  const skinToneButtons = []

  Colors.Skin.forEach((color, index) => {
    const skinToneButton = new ColorButton({
      scene,
      imageManager: scene.managers.imageManager,
      id: `skinToneButton${color}`,
      top: Math.floor((canvasRect.top + 140) + Math.floor(index / 8) * (2 * StandardUIBox.height)),
      left: Math.floor(canvasRect.left + 350 + (index % 8) * (2 * StandardUIBox.width) + index * 4),
      imgDims: StandardUIBox,
      color: color,
      activate: () => {
        updatePlayerSkinTone(scene, Player1, color)
      }
    })

    skinToneButtons.push(skinToneButton)
  })

  return skinToneButtons
}

function buildHairColorButtons (scene, canvasRect) {
  const hairColorButtons = []

  Colors.Hair.forEach((color, index) => {
    const hairColorButton = new ColorButton({
      scene,
      imageManager: scene.managers.imageManager,
      id: `hairColorButton${color}`,
      top: Math.floor((canvasRect.top + 210) + Math.floor(index / 11) * (2 * StandardUIBox.height)),
      left: Math.floor(canvasRect.left + 350 + (index % 11) * (2 * StandardUIBox.width) + index * 4),
      imgDims: StandardUIBox,
      color: color,
      activate: () => {
        updatePlayerHairColor(scene, Player1, color)
      }
    })

    hairColorButtons.push(hairColorButton)
  })

  return hairColorButtons
}

function buildHairStyleButtons (scene, canvasRect) {
  const hairStyleButtons = []

  const hairStyles = Object.keys(PlayerHairData)
  hairStyles.forEach((styleKey, index) => {
    const style = PlayerHairData[styleKey]
    const hairStyleButton = new StyleButton({
      scene,
      imageManager: scene.managers.imageManager,
      id: `hairStyleButton${style.name}`,
      top: Math.floor((canvasRect.top + 285) + Math.floor(index / 11) * (2 * StandardUIBox.height)),
      left: Math.floor(canvasRect.left + 350 + (index % 11) * (2 * StandardUIBox.width) + index * 4),
      imgDims: StandardUIBox,
      foreground: style,
      activate: () => {
        updatePlayerHairStyle(scene, Player1, style)
      }
    })

    hairStyleButtons.push(hairStyleButton)    
  })

  return hairStyleButtons
}

function buildAccessoriesButtons (scene, canvasRect) {
  const accessoriesButtons = []

  const accessories = Object.keys(PlayerAccessoriesData)
  accessories.forEach((styleKey, index) => {
    const style = PlayerAccessoriesData[styleKey]
    const accessoriesButton = new StyleButton({
      scene,
      imageManager: scene.managers.imageManager,
      id: `accessoriesButton${style.name}`,
      top: Math.floor((canvasRect.top + 360) + Math.floor(index / 11) * (2 * StandardUIBox.height)),
      left: Math.floor(canvasRect.left + 350 + (index % 11) * (2 * StandardUIBox.width) + index * 4),
      imgDims: StandardUIBox,
      foreground: style,
      activate: () => {
        updatePlayerAccessories(scene, Player1, style)
      }
    })

    accessoriesButtons.push(accessoriesButton)    
  })

  return accessoriesButtons
}

function buildShirtColorButtons (scene, canvasRect) {
  const shirColorButtons = []

  Colors.Shirt.forEach((color, index) => {
    const shirtColorButton = new ColorButton({
      scene,
      imageManager: scene.managers.imageManager,
      id: `shirtColorButton${color}`,
      top: Math.floor((canvasRect.top + 430) + Math.floor(index / 8) * (2 * StandardUIBox.height)),
      left: Math.floor(canvasRect.left + 350 + (index % 8) * (2 * StandardUIBox.width) + index * 4),
      imgDims: StandardUIBox,
      color: color,
      activate: () => {
        updatePlayerShirtColor(scene, Player1, color)
      }
    })

    shirColorButtons.push(shirtColorButton)
  })

  return shirColorButtons
}

function buildPantsColorButtons (scene, canvasRect) {
  const pantsColorButtons = []

  Colors.Pants.forEach((color, index) => {
    const pantsColorButton = new ColorButton({
      scene,
      imageManager: scene.managers.imageManager,
      id: `pantsColorButton${color}`,
      top: Math.floor((canvasRect.top + 500) + Math.floor(index / 6) * (2 * StandardUIBox.height)),
      left: Math.floor(canvasRect.left + 350 + (index % 6) * (2 * StandardUIBox.width) + index * 4),
      imgDims: StandardUIBox,
      color: color,
      activate: () => {
        updatePlayerPantsColor(scene, Player1, color)
      }
    })

    pantsColorButtons.push(pantsColorButton)
  })

  return pantsColorButtons
}

function createPlayerImages (scene) {
  const basePlayerImage = scene.managers.imageManager.getPlayerImage(EntityTypes.Player1)

  scene.player1.images.body = createPlayerBodyImage(scene, basePlayerImage)
 // scene.player2.images.body = createPlayerBodyImage(scene, basePlayerImage)

 scene.player1.images.accessories = createPlayerAccessoriesImage(scene, basePlayerImage)

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

function createPlayerAccessoriesImage (scene, basePlayerImage) {
  const accessoriesCanvas = document.createElement('canvas')
  const accessoriesCtx = accessoriesCanvas.getContext('2d')
  accessoriesCanvas.width = SteveIdleDown.frameWidth + 2 * SteveIdleDown.padding
  accessoriesCanvas.height = SteveIdleDown.frameHeight + 2 * SteveIdleDown.padding
  // accessoriesCtx.drawImage(basePlayerImage, PlayerAccessoriesData.Accessories.x, PlayerAccessoriesData.Accessories.y, accessoriesCanvas.width, accessoriesCanvas.height, 0, 0, accessoriesCanvas.width, accessoriesCanvas.height)

  return accessoriesCanvas
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
  compositeCtx.drawImage(player.images.accessories, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
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

function updatePlayerHairStyle (scene, player, newHairStyle) {
  if (player === EntityTypes.Player1) {
    scene.player1.images.hair = scene.imageManager.replaceImageInImage(scene.player1.images.hair, scene.imageManager.getImageWithSrc(BasePlayer), newHairStyle)
    scene.player1.images.hair = scene.imageManager.replaceColorInImage(scene.player1.images.hair, newHairStyle.baseColor, scene.player1.colors.hairColor)
    scene.player1.styles.hairStyle = newHairStyle
  } /*else {
    scene.player2.images.hair = scene.imageManager.replaceImageInImage(scene.player2.images.hair, scene.player2.images.hair, newHairStyle)
    scene.player2.styles.hairStyle = newHairStyle
  }*/

  updateCompositePlayerImage(scene, player)
  scene.gameManager.setPlayerStyles(player, 'Hair', newHairStyle)
}

function updatePlayerAccessories (scene, player, newAccessories) {
  if (player === EntityTypes.Player1) {
    scene.player1.images.accessories = scene.imageManager.replaceImageInImage(scene.player1.images.accessories, scene.imageManager.getImageWithSrc(BasePlayer), newAccessories)
    scene.player1.styles.accessories = newAccessories
  } /*else {
    scene.player2.images.accessories = scene.imageManager.replaceImageInImage(scene.player2.images.accessories, scene.imageManager.getImageWithSrc(BasePlayer), newAccessories)
    scene.player2.styles.accessories = newAccessories
  }*/

  updateCompositePlayerImage(scene, player)
  scene.gameManager.setPlayerStyles(player, 'Accessories', newAccessories)
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
    const compositeCanvas = document.createElement('canvas')
    compositeCanvas.width = scene.player1.images.composite.width
    compositeCanvas.height = scene.player1.images.composite.height
    const compositeCtx = compositeCanvas.getContext('2d')
    compositeCtx.drawImage(scene.player1.images.body, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player1.images.accessories, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player1.images.hair, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player1.images.shirt, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player1.images.pants, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    scene.player1.images.composite = compositeCanvas
  }/* else {
    const compositeCanvas = scene.player2.images.composite
    const compositeCtx = compositeCanvas.getContext('2d')
    compositeCtx.drawImage(scene.player2.images.body, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player2.images.hair, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player2.images.shirt, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
    compositeCtx.drawImage(scene.player2.images.pants, 0, 0, compositeCanvas.width, compositeCanvas.height, 0, 0, compositeCanvas.width, compositeCanvas.height)
  }*/
}