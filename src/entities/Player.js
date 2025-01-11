import PlayerAnimations from '../globals/PlayerAnimations.js'
import Animation from '../components/Animation.js'
import PlayerImageData from '../globals/PlayerImageData.js'
import { waterGroundSound, tillGroundSound, openDoorSound, harvestCropSound, plantSeedSound, stepSound1, stepSound2, stepSound3, stepSound4 } from '../globals/Sounds.js'

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

  sleep () {
    setStaminaForLocation(this)
    setLocationToHome(this)
  }

  wake () {
    console.log('Player wake called')
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
  const hairStyle = player.styles.Hair
  hairCtx.drawImage(basePlayerImage, hairStyle.x, hairStyle.y, hairStyle.width, hairStyle.height, 0, 0, hairStyle.width, hairStyle.height)
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

function maybePlayFootStepSounds(player) {
    const STEP_VOL = 0.15
    const STEP_DELAY = 0.4 // seconds between footsteps
    // are we currently walking?
    if (player.animation === player.animations.SteveWalkRight || 
        player.animation === player.animations.SteveWalkLeft ||
        player.animation === player.animations.SteveWalkUp ||
        player.animation === player.animations.SteveWalkDown) {
        // console.log("player is walking!")
        let now = performance.now()
        // occasionally play a random sound
        if (!player.nextFootStepSoundTimestamp || player.nextFootStepSoundTimestamp < now) {
            // console.log("player made a footstep sound!")
            let rnd = Math.random()
            if (rnd <= 0.25) player.scene.audioManager?.playSource(stepSound1,STEP_VOL)
            else if (rnd <= 0.5) player.scene.audioManager?.playSource(stepSound2,STEP_VOL)
            else if (rnd <= 0.75) player.scene.audioManager?.playSource(stepSound3,STEP_VOL)
            else player.scene.audioManager?.playSource(stepSound4,STEP_VOL)
            // wait for a while
            player.nextFootStepSoundTimestamp = now + STEP_DELAY
        }

    } else {
        // currently not moving - play no sound
        // once we start moving let the sound play immediately
        // console.log("player is idle! no footsteps needed.")
        player.nextFootStepSoundTimestamp = 0
    }
}

function handleInput (player) {
  if (player.scene.isMenuDialogueShowing()) return // Don't allow player to move while gift dialog is showing

  const downKeys = player.game.inputManager.getDownKeys(player.type)
  const playerJustDownKeys = player.game.inputManager.getJustDownKeys(player.type)
  const SFX_VOL = 0.2 // how loud the sound effects made by the player are

  if (playerJustDownKeys.includes(player.controls.Action)) {
    if (player.scene.showingNPCDialogue) {
      // player is trying to give a gift to an NPC
      player.scene.showGiftDialogue()
    } else if (player.scene.playerIsNearBed ? player.scene.playerIsNearBed(player.collisionPoint) : false) {
      // Show sleep dialogue/confirmation
    } else {
      // player action is determined by the tool they have selected (pick, axe, hoe, etc.)
      const groundPoint = { x: player.collisionPoint.x, y: player.collisionPoint.y - 2 } // -2 to check the tile just above the bottom of th player's feet
      const mapActions  = player.scene.getAvailableMapActions(groundPoint.x, groundPoint.y)
      if (mapActions.includes('Open Door')) {
        player.scene.openDoor(groundPoint.x, groundPoint.y)
        player.scene.audioManager?.playSource(openDoorSound,SFX_VOL)
      } else if (mapActions.includes('Till') && player.scene.entityManager.isShovel(player.activeTool)) {
        player.scene.tillGround(groundPoint.x, groundPoint.y, player.activeTool.size, getFacing(player))
        player.scene.particles?.tillGroundFX(groundPoint.x, groundPoint.y) 
        player.scene.audioManager?.playSource(tillGroundSound,SFX_VOL)
        deductConsumedStamina(player, player.activeTool.staminaConsumed)
      } else if (mapActions.includes('Plant') && player.scene.entityManager.isSeed(player.activeTool)) {
        player.scene.plantSeed(player.activeTool.type, groundPoint.x, groundPoint.y)
        player.scene.audioManager?.playSource(plantSeedSound,SFX_VOL)
        player.scene.particles?.plantSeedFX(groundPoint.x, groundPoint.y) 
        deductConsumedStamina(player, 0.25) // magic number for planting a seed, could be a property of the seed type
      } else if (mapActions.includes('Water') && player.scene.entityManager.isWateringCan(player.activeTool)) {
        player.scene.waterGround(groundPoint.x, groundPoint.y, player.activeTool.size, getFacing(player))
        player.scene.particles?.waterGroundFX(groundPoint.x, groundPoint.y) 
        player.scene.audioManager?.playSource(waterGroundSound,SFX_VOL)
        deductConsumedStamina(player, player.activeTool.staminaConsumed)
      } else if (mapActions.includes('Harvest') && player.scene.entityManager.isHoe(player.activeTool)) {
        const didHarvest = player.scene.harvestCrop(groundPoint.x, groundPoint.y, player.activeTool.size, getFacing(player))
        if (didHarvest) {
          deductConsumedStamina(player, player.activeTool.staminaConsumed)
          player.scene.particles?.harvestCropFX(groundPoint.x, groundPoint.y) 
          player.scene.audioManager?.playSource(harvestCropSound,SFX_VOL)
        }
      } else if (mapActions.includes('Clear') && player.scene.entityManager.isHoe(player.activeTool)) {
        const didClear = player.scene.clearCrop(groundPoint.x, groundPoint.y, player.activeTool.size, getFacing(player))
        if (didClear) {
          deductConsumedStamina(player, player.activeTool.staminaConsumed)
          player.scene.particles?.harvestCropFX(groundPoint.x, groundPoint.y) 
          player.scene.audioManager?.playSource(harvestCropSound,SFX_VOL)
        }
      } else if (mapActions.includes('Chop') && player.scene.entityManager.isAxe(player.activeTool)) {
        player.scene.chopTree(groundPoint.x, groundPoint.y, player.activeTool.damage)
      } else if (mapActions.includes('Fish') && player.scene.entityManager.isFishingRod(player.activeTool)) {
        // TODO: Implement fishing
        // player.scene.fish(groundPoint.x, groundPoint.y, player.activeTool.size, getFacing(player))
      } else if (!player.activeTool) {
        // If player has no active tool, they can't perform any actions
        // Show "no tool selected" message
      }
    }
  } else if (downKeys.includes(player.controls.Up)) {
    if (player.scene.playerCanWalk({ x: player.collisionPoint.x, y: player.collisionPoint.y - player.speed })) {
      player.y -= player.speed
      player.scene.playerIsWalkingNow(true)
    }

    if (player.animation !== player.animations.SteveWalkUp) {
      player.animation = player.animations.SteveWalkUp
    }
  } else if (downKeys.includes(player.controls.Down)) {
    if (player.scene.playerCanWalk({ x: player.collisionPoint.x, y: player.collisionPoint.y + player.speed })) {
      player.y += player.speed
      player.scene.playerIsWalkingNow(true)
    }

    if (player.animation !== player.animations.SteveWalkDown) {
      player.animation = player.animations.SteveWalkDown
    }
  } else if (downKeys.includes(player.controls.Left)) {
    if (player.scene.playerCanWalk({ x: player.collisionPoint.x - player.speed, y: player.collisionPoint.y })) {
      player.x -= player.speed
      player.scene.playerIsWalkingNow(true)
    }

    if (player.animation !== player.animations.SteveWalkLeft) {
      player.animation = player.animations.SteveWalkLeft
    }
  }  else if (downKeys.includes(player.controls.Right)) {
    if (player.scene.playerCanWalk({ x: player.collisionPoint.x + player.speed, y: player.collisionPoint.y })) {
      player.x += player.speed
      player.scene.playerIsWalkingNow(true)
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

  maybePlayFootStepSounds(player)

  //cheat for Max Stamina
  const justDownKeys = player.game.inputManager.getJustDownKeys()
  if (CheatKeys) {
    if(justDownKeys.includes(K)) {
      setMaxStamina(player)
      console.log("player stamina: "+player.stamina)
    }
  
    if(justDownKeys.includes(M)) {
      updateMoney(player)
    }
  }
}

function setStaminaForLocation (player) {
  // Need to check if player is near thier bed
  // If so, set stamina to 100, otherwise, set stamina to 50
  setMaxStamina(player)
}

function updateStamina (player) {
  player.stamina -= 0.01

  if (player.stamina <= 0) {
    player.stamina = 0
  }

  player.scene.gameManager.setPlayerStamina(player.type, player.stamina)
}

function deductConsumedStamina (player, amount) {
  player.stamina -= amount
  player.scene.gameManager.setPlayerStamina(player.type, player.stamina)
}

function setMaxStamina (player) {
  player.stamina = 100
  player.scene.gameManager.setPlayerStamina(player.type, player.stamina)
}

function updateMoney (player) {
  player.scene.gameManager.setMoney(player.scene.gameManager.getMoney() + 10)
  console.log(player.scene.gameManager.getMoney())
}

function setLocationToHome (player) {
  const homePos = player.game.mapManager.getPlayerStart(player.type)
  player.x = homePos.x
  player.y = homePos.y
}

function getFacing (player) {
  if (player.animation === player.animations.SteveIdleUp || player.animation === player.animations.SteveWalkUp) {
    return 'up'
  } else if (player.animation === player.animations.SteveIdleDown || player.animation === player.animations.SteveWalkDown) {
    return 'down'
  } else if (player.animation === player.animations.SteveIdleLeft || player.animation === player.animations.SteveWalkLeft) {
    return 'left'
  } else if (player.animation === player.animations.SteveIdleRight || player.animation === player.animations.SteveWalkRight) {
    return 'right'
  }
}