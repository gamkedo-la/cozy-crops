import { Player1, Player2 } from '../globals/EntityTypes.js'
import Animations from '../globals/Animations.js'
import Animation from '../components/Animation.js'
import { Player1Keys, Player2Keys } from '../globals/Keys.js'
import { PlayerBodySection, PlayerShirtSection, PlayerPantsSection, PlayerAccessoriesSection, PlayerHairSection, PlayerArmsSection } from '../globals/PlayerImageData.js'

export default class Player {
  constructor (config) {
    Object.assign(this, config)

    this.animations = {}
    this.animation = null // Initialize once animations are built
    this.speed = 2
    if (this.type === Player1) {
      this.keys = Player1Keys
    } else if (this.type === Player2) {
      this.keys = Player2Keys
    }

    this.collisionPoint = {
      x: 0, // Initialize once animations are built
      y: 0 // Initialize once animations are built
    }
  }

  async init () {
    await buildAnimations(this)

    this.animation = this.animations.SteveIdleDown

    this.collisionPoint = {
      x: this.x + this.animation.width / 2, // Center of the player
      y: this.y + this.animation.height // Bottom of the player
    }
  }

  update (deltaTime) {
    handleInput(this)
    this.animation.update(deltaTime)
    this.collisionPoint = {
      x: this.x + this.animation.width / 2, // Center of the player
      y: this.y + this.animation.height // Bottom of the player
    }
  }

  draw (camera) {
    this.animation.draw(this.x, this.y, camera)
  }
}

async function buildAnimations (player) {
  const playerCanvas = await buildSpritesheet(player)
  for (const animation of Object.values(Animations)) {
    const animationConfig = Object.assign({}, animation)
    animationConfig.game = player.game
    animationConfig.imageManager = player.imageManager
    animationConfig.imageSrc = animation.spritesheet
    animationConfig.canvas = playerCanvas

    player.animations[animation.name] = new Animation(animationConfig)
  }
}

async function buildSpritesheet (player) {
  const basePlayerImage = player.imageManager.getPlayerImage(player.type)

  const bodyCanvas = document.createElement('canvas')
  const bodyCtx = bodyCanvas.getContext('2d')
  bodyCanvas.width = PlayerBodySection.width
  bodyCanvas.height = PlayerBodySection.height
  bodyCtx.drawImage(basePlayerImage, PlayerBodySection.x, PlayerBodySection.y, PlayerBodySection.width, PlayerBodySection.height, 0, 0, PlayerBodySection.width, PlayerBodySection.height)
  const bodyImage = await replaceColorInImage(bodyCanvas, PlayerBodySection.baseColor, player.skinColor)

  const shirtCanvas = document.createElement('canvas')
  const shirtCtx = shirtCanvas.getContext('2d')
  shirtCanvas.width = PlayerShirtSection.width
  shirtCanvas.height = PlayerShirtSection.height
  shirtCtx.drawImage(basePlayerImage, PlayerShirtSection.x, PlayerShirtSection.y, PlayerShirtSection.width, PlayerShirtSection.height, 0, 0, PlayerShirtSection.width, PlayerShirtSection.height)
  const shirtImage = await replaceColorInImage(shirtCanvas, PlayerShirtSection.baseColor, player.shirtColor)

  const pantsCanvas = document.createElement('canvas')
  const pantsCtx = pantsCanvas.getContext('2d')
  pantsCanvas.width = PlayerPantsSection.width
  pantsCanvas.height = PlayerPantsSection.height
  pantsCtx.drawImage(basePlayerImage, PlayerPantsSection.x, PlayerPantsSection.y, PlayerPantsSection.width, PlayerPantsSection.height, 0, 0, PlayerPantsSection.width, PlayerPantsSection.height)
  const pantsImage = await replaceColorInImage(pantsCanvas, PlayerPantsSection.baseColor, player.pantsColor)

  // const accessoriesCanvas = document.createElement('canvas')
  // const accessoriesCtx = accessoriesCanvas.getContext('2d')
  // accessoriesCanvas.width = PlayerAccessoriesSection.width
  // accessoriesCanvas.height = PlayerAccessoriesSection.height
  // accessoriesCtx.drawImage(basePlayerImage, PlayerAccessoriesSection.x, PlayerAccessoriesSection.y, PlayerAccessoriesSection.width, PlayerAccessoriesSection.height, 0, 0, PlayerAccessoriesSection.width, PlayerAccessoriesSection.height)
  // const accessoriesImage = await replaceColorInImage(accessoriesCanvas, PlayerAccessoriesSection.baseColor, player.accessoriesColor)

  const hairCanvas = document.createElement('canvas')
  const hairCtx = hairCanvas.getContext('2d')
  hairCanvas.width = PlayerHairSection.width
  hairCanvas.height = PlayerHairSection.height
  hairCtx.drawImage(basePlayerImage, PlayerHairSection.x, PlayerHairSection.y, PlayerHairSection.width, PlayerHairSection.height, 0, 0, PlayerHairSection.width, PlayerHairSection.height)
  const hairImage = await replaceColorInImage(hairCanvas, PlayerHairSection.baseColor, player.hairColor)

  const armCanvas = document.createElement('canvas')
  const armCtx = armCanvas.getContext('2d')
  armCanvas.width = PlayerArmsSection.width
  armCanvas.height = PlayerArmsSection.height
  armCtx.drawImage(basePlayerImage, PlayerArmsSection.x, PlayerArmsSection.y, PlayerArmsSection.width, PlayerArmsSection.height, 0, 0, PlayerArmsSection.width, PlayerArmsSection.height)
  const armImage = await replaceColorInImage(armCanvas, PlayerArmsSection.baseColor, player.skinColor)

  const spritesheet = document.createElement('canvas')
  const spritesheetCtx = spritesheet.getContext('2d')
  spritesheet.width = bodyCanvas.width
  spritesheet.height = bodyCanvas.height
  spritesheetCtx.drawImage(bodyImage, 0, 0)
  spritesheetCtx.drawImage(shirtImage, 0, 0)
  spritesheetCtx.drawImage(armImage, 0, 0)
  spritesheetCtx.drawImage(pantsImage, 0, 0)
  // spritesheetCtx.drawImage(accessoriesImage, 0, 0) // this doesn't work because the accessories are not in the right place
  spritesheetCtx.drawImage(hairImage, 0, 0)

  return spritesheet
}

async function replaceColorInImage(image, oldColor, newColor) {
  return new Promise((resolve, reject) => {
    // Create a temporary canvas
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')
    tempCanvas.width = image.width
    tempCanvas.height = image.height

    // Draw the image onto the temporary canvas
    tempCtx.drawImage(image, 0, 0)

    // Get the image data
    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
    const data = imageData.data

    // Define the old and new colors
    const [oldR, oldG, oldB, oldA] = oldColor
    const [newR, newG, newB, newA] = newColor

    // Loop through the image data and replace the old color with the new color
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] === oldR && data[i + 1] === oldG && data[i + 2] === oldB && data[i + 3] === oldA) {
        data[i] = newR
        data[i + 1] = newG
        data[i + 2] = newB
        data[i + 3] = newA
      }
    }

    // Put the modified image data back onto the canvas
    tempCtx.putImageData(imageData, 0, 0)

    // Create a new Image object
    const newImage = new Image()
    newImage.src = tempCanvas.toDataURL()

    // Resolve the promise when the new image is loaded
    newImage.onload = () => resolve(newImage)
    newImage.onerror = reject
  })
}

function handleInput (player) {
  const downKeys = player.game.inputManager.getDownKeys(player.type)

  if (downKeys.includes(player.keys.Up)) {
    if (player.scene.playerCanWalk({ x: player.collisionPoint.x, y: player.collisionPoint.y - player.speed })) {
      player.y -= player.speed
    }

    if (player.animation !== player.animations.SteveWalkUp) {
      player.animation = player.animations.SteveWalkUp
    }
  } else if (downKeys.includes(player.keys.Down)) {
    if (player.scene.playerCanWalk({ x: player.collisionPoint.x, y: player.collisionPoint.y + player.speed })) {
      player.y += player.speed
    }

    if (player.animation !== player.animations.SteveWalkDown) {
      player.animation = player.animations.SteveWalkDown
    }
  } else if (downKeys.includes(player.keys.Left)) {
    if (player.scene.playerCanWalk({ x: player.collisionPoint.x - player.speed, y: player.collisionPoint.y })) {
      player.x -= player.speed
    }

    if (player.animation !== player.animations.SteveWalkLeft) {
      player.animation = player.animations.SteveWalkLeft
    }
  }  else if (downKeys.includes(player.keys.Right)) {
    if (player.scene.playerCanWalk({ x: player.collisionPoint.x + player.speed, y: player.collisionPoint.y })) {
      player.x += player.speed
    }

    if (player.animation !== player.animations.SteveWalkRight) {
      player.animation = player.animations.SteveWalkRight
    }
  } else {
    if (player.animation === player.animations.SteveWalkUp) {
      player.animation = player.animations.SteveIdleUp
    } else if (player.animation === player.animations.SteveWalkDown) {
      player.animation = player.animations.SteveIdleDown
    } else if (player.animation === player.animations.SteveWalkLeft) {
      player.animation = player.animations.SteveIdleLeft
    } else if (player.animation === player.animations.SteveWalkRight) {
      player.animation = player.animations.SteveIdleRight
    }
  }
}