import { UnWalkable } from '../globals/Tiles.js'

export default class CollisionManager {
  constructor(config) {
    Object.assign(this, config)
  }

  playerCanWalk (tileIndex) {
    return !UnWalkable.includes(tileIndex)
  }
}
