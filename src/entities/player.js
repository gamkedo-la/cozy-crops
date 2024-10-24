import PlayerAnimations from '../globals/PlayerAnimations.js'
import Animation from '../components/Animation.js'
import PlayerImageData from '../globals/PlayerImageData.js'

//These are for Cheats
import { K, M } from '../globals/Keys.js'
import { CheatKeys } from '../globals/Debug.js'

export default class Player {
  constructor (config) {
    Object.assign(this, config)

    this.width = 0 // Initialize once animations are built
    this.height = 0 // Initialize once animations are built
    this.animations = {}
    this.animation = null // Initialize once animations are built
    this.speed = 2
    this.stamina = 100

    this.collisionPoint = {
      x: 0, // Initialize once animations are built
      y: 0 // Initialize once animations are built
    }

    this.activeTool = null
  }

  init () {
    buildAnimations(this)

    this.animation = this.animations.SteveIdleDown

    this.collisionPoint = {
      x: this.x + this.animation.width / 2, // Center of the player
      y: this.y + this.animation.height // Bottom of the player
    }

    this.width = this.animation.width
    this.height = this.animation.height
  }

  update (deltaTime) {
    handleInput(this)
    updateStamina(this)
    this.animation.update(deltaTime)
    this.collisionPoint = {
      x: this.x + this.animation.width / 2, // Center of the player
      y: this.y + this.animation.height // Bottom of the player
    }
  }

  draw (camera) {
    this.animation.draw(this.x, this.y, camera)
  }

  setActiveTool (tool) {
    this.activeTool = tool
  }
}

function buildAnimations (player) {
  const playerCanvas = buildSpritesheet(player)
  for (const animation of Object.values(PlayerAnimations)) {
    const animationConfig = Object.assign({}, animation)
    animationConfig.owner = player
    animationConfig.game = player.game
    animationConfig.imageManager = player.imageManager
    animationConfig.imageSrc = animation.spritesheet
    animationConfig.canvas = playerCanvas

    player.animations[animation.name] = new Animation(animationConfig)
  }
}

function buildSpritesheet (player) {
  const basePlayerImage = player.imageManager.getPlayerImage(player.type)

  const bodyCanvas = document.createElement('canvas')
  const bodyCtx = bodyCanvas.getContext('2d')
  bodyCanvas.width = PlayerImageData.Body.width
  bodyCanvas.height = PlayerImageData.Body.height
  bodyCtx.drawImage(basePlayerImage, PlayerImageData.Body.x, PlayerImageData.Body.y, PlayerImageData.Body.width, PlayerImageData.Body.height, 0, 0, PlayerImageData.Body.width, PlayerImageData.Body.height)
  const bodyImage = player.imageManager.replaceColorInImage(bodyCanvas, PlayerImageData.Body.baseColor, player.skinColor)

  const shirtCanvas = document.createElement('canvas')
  const shirtCtx = shirtCanvas.getContext('2d')
  shirtCanvas.width = PlayerImageData.Shirt.width
  shirtCanvas.height = PlayerImageData.Shirt.height
  shirtCtx.drawImage(basePlayerImage, PlayerImageData.Shirt.x, PlayerImageData.Shirt.y, PlayerImageData.Shirt.width, PlayerImageData.Shirt.height, 0, 0, PlayerImageData.Shirt.width, PlayerImageData.Shirt.height)
  const shirtImage = player.imageManager.replaceColorInImage(shirtCanvas, PlayerImageData.Shirt.baseColor, player.shirtColor)

  const pantsCanvas = document.createElement('canvas')
  const pantsCtx = pantsCanvas.getContext('2d')
  pantsCanvas.width = PlayerImageData.Pants.width
  pantsCanvas.height = PlayerImageData.Pants.height
  pantsCtx.drawImage(basePlayerImage, PlayerImageData.Pants.x, PlayerImageData.Pants.y, PlayerImageData.Pants.width, PlayerImageData.Pants.height, 0, 0, PlayerImageData.Pants.width, PlayerImageData.Pants.height)
  const pantsImage = player.imageManager.replaceColorInImage(pantsCanvas, PlayerImageData.Pants.baseColor, player.pantsColor)

  // const accessoriesCanvas = document.createElement('canvas')
  // const accessoriesCtx = accessoriesCanvas.getContext('2d')
  // accessoriesCanvas.width = PlayerImageData.Accessories.width
  // accessoriesCanvas.height = PlayerImageData.Accessories.height
  // accessoriesCtx.drawImage(basePlayerImage, PlayerImageData.Accessories.x, PlayerImageData.Accessories.y, PlayerImageData.Accessories.width, PlayerImageData.Accessories.height, 0, 0, PlayerImageData.Accessories.width, PlayerImageData.Accessories.height)
  // const accessoriesImage = player.imageManager.replaceColorInImage(accessoriesCanvas, PlayerImageData.Accessories.baseColor, player.accessoriesColor)

  const hairCanvas = document.createElement('canvas')
  const hairCtx = hairCanvas.getContext('2d')
  hairCanvas.width = PlayerImageData.Hair.width
  hairCanvas.height = PlayerImageData.Hair.height
  hairCtx.drawImage(basePlayerImage, PlayerImageData.Hair.x, PlayerImageData.Hair.y, PlayerImageData.Hair.width, PlayerImageData.Hair.height, 0, 0, PlayerImageData.Hair.width, PlayerImageData.Hair.height)
  const hairImage = player.imageManager.replaceColorInImage(hairCanvas, PlayerImageData.Hair.baseColor, player.hairColor)

  const armCanvas = document.createElement('canvas')
  const armCtx = armCanvas.getContext('2d')
  armCanvas.width = PlayerImageData.Arms.width
  armCanvas.height = PlayerImageData.Arms.height
  armCtx.drawImage(basePlayerImage, PlayerImageData.Arms.x, PlayerImageData.Arms.y, PlayerImageData.Arms.width, PlayerImageData.Arms.height, 0, 0, PlayerImageData.Arms.width, PlayerImageData.Arms.height)
  const armImage = player.imageManager.replaceColorInImage(armCanvas, PlayerImageData.Arms.baseColor, player.skinColor)

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

function handleInput (player) {
  const downKeys = player.game.inputManager.getDownKeys(player.type)
  const playerJustDownKeys = player.game.inputManager.getJustDownKeys(player.type)

  if (playerJustDownKeys.includes(player.controls.Action)) {
    // Need to check if player is near a bed, a door, or a person
    // If not, player action is determined by the tool they have selected (pick, axe, hoe, etc.)
    // If they have no tool selected, they can't perform any actions
    const groundPoint = { x: player.collisionPoint.x, y: player.collisionPoint.y -2 }
    const mapActions  = player.scene.getAvailableMapActions(groundPoint.x, groundPoint.y) // -2 to check the tile just above the bottom of th player's feet
    if (mapActions.includes('Sleep')) {
      console.log('Sleep')
      // player.scene.gameManager.newDaySave(player.scene.gameManager.getDate())
    } else if (mapActions.includes('Open Door')) {
      console.log('Open Door')
      // player.scene.gameManager.openDoor()
    } else if (mapActions.includes('Till') && player.scene.entityManager.isHoe(player.activeTool)) {
      player.scene.tillGround(groundPoint.x, groundPoint.y)
    } else if  (mapActions.includes('Plant') && player.scene.entityManager.isSeed(player.activeTool)) {
      console.log('Plant')
      // player.scene.gameManager.plantSeeds()
    } else if (mapActions.includes('Water') && player.scene.entityManager.isWateringCan(player.activeTool)) {
      player.scene.waterGround(groundPoint.x, groundPoint.y)
    }
  } else if (downKeys.includes(player.controls.Up)) {
    if (player.scene.playerCanWalk({ x: player.collisionPoint.x, y: player.collisionPoint.y - player.speed })) {
      player.y -= player.speed
    }

    if (player.animation !== player.animations.SteveWalkUp) {
      player.animation = player.animations.SteveWalkUp
    }
  } else if (downKeys.includes(player.controls.Down)) {
    if (player.scene.playerCanWalk({ x: player.collisionPoint.x, y: player.collisionPoint.y + player.speed })) {
      player.y += player.speed
    }

    if (player.animation !== player.animations.SteveWalkDown) {
      player.animation = player.animations.SteveWalkDown
    }
  } else if (downKeys.includes(player.controls.Left)) {
    if (player.scene.playerCanWalk({ x: player.collisionPoint.x - player.speed, y: player.collisionPoint.y })) {
      player.x -= player.speed
    }

    if (player.animation !== player.animations.SteveWalkLeft) {
      player.animation = player.animations.SteveWalkLeft
    }
  }  else if (downKeys.includes(player.controls.Right)) {
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
  //cheat for Max Stamina
  const justDownKeys = player.game.inputManager.getJustDownKeys()
  if (CheatKeys) {
    if(justDownKeys.includes(K)) {
      setMaxStamina(player)
      console.log(player.stamina)
    }
  
    if(justDownKeys.includes(M)) {
      updateMoney(player)
    }
  }
}

function updateStamina (player) {
  player.stamina -= 0.01

  if (player.stamina < 0) {
    player.stamina = 0
  }

  player.scene.gameManager.setPlayerStamina(player.type, player.stamina)
}

function setMaxStamina(player) {
  player.stamina = 100
  player.scene.gameManager.setPlayerStamina(player.type, player.stamina)
}

function updateMoney(player) {
  player.scene.gameManager.setMoney(player.scene.gameManager.getMoney() + 10)
  console.log(player.scene.gameManager.getMoney())
}