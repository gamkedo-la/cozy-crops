import { Player1, Player2 } from '../globals/EntityTypes.js'
import Animations from '../globals/Animations.js'
import Animation from '../components/Animation.js'
import { Player1Keys, Player2Keys } from '../globals/Keys.js'

export default class Player {
  constructor (config) {
    Object.assign(this, config)

    this.animations = {}
    buildAnimations(this)
    this.animation = this.animations.SteveIdleDown
    this.speed = 2
    if (this.type === Player1) {
      this.keys = Player1Keys
    } else if (this.type === Player2) {
      this.keys = Player2Keys
    }
  }

  update (deltaTime) {
    handleInput(this)
    this.animation.update(deltaTime)
  }

  draw () {
    this.animation.draw(this.x, this.y)
  }
}

function buildAnimations (player) {
  for (const animation of Object.values(Animations)) {
    const animationConfig = Object.assign({}, animation)
    animationConfig.game = player.game
    animationConfig.imageManager = player.imageManager
    animationConfig.imageSrc = animation.spritesheet

    player.animations[animation.name] = new Animation(animationConfig)
  }
}

function handleInput (player) {
  const downKeys = player.game.inputManager.getDownKeys(player.type)

  if (downKeys.includes(player.keys.Up)) {
    player.y -= player.speed
    if (player.animation !== player.animations.SteveWalkUp) {
      player.animation = player.animations.SteveWalkUp
    }
  } else if (downKeys.includes(player.keys.Down)) {
    player.y += player.speed
    if (player.animation !== player.animations.SteveWalkDown) {
      player.animation = player.animations.SteveWalkDown
    }
  } else if (downKeys.includes(player.keys.Left)) {
    player.x -= player.speed
    if (player.animation !== player.animations.SteveWalkLeft) {
      player.animation = player.animations.SteveWalkLeft
    }
  }  else if (downKeys.includes(player.keys.Right)) {
    player.x += player.speed
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