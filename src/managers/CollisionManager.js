import { UnWalkable, Ungrowable } from '../globals/Tiles.js'

export default class CollisionManager {
  constructor(config) {
    Object.assign(this, config)

    this.collidables = []
  }

  playerCanWalk (tileIndex) {
    return !UnWalkable.includes(tileIndex)
  }

  tileIsGrowable (tileIndex) {
    const isGrowable = !Ungrowable.includes(tileIndex)
    return isGrowable
  }

  addEntity (collidable) {
    this.collidables.push(collidable)
  }

  removeEntity (collidable) {
    this.collidables = this.collidables.filter(c => c !== collidable)
  }

  update (deltaTime) {
    this.collidables.forEach(collidable => collidable.checkCollision(this.player))
  }
}
