import EntityTypes from '../globals/EntityTypes.js'

export default class EntityManager {
  constructor (config) {
    Object.assign(this, config)

    this.entities = []
    this.movingEntities = []
  }

  addEntity (entity, canMove = false) {
    if (canMove) {
      this.movingEntities.push(entity)
    } else {
      insertEntity(this.entities, entity)
    }
  }

  getDrawList () {
    const drawList = [...this.entities]
    const movingEntitiesToAdd = [...this.movingEntities]

    let low = 0
    let high = drawList.length
  
    movingEntitiesToAdd.forEach(entity => {
      while (low < high) {
        const mid = Math.floor((low + high) / 2)
        if ((drawList[mid].collisionPoint?.y || drawList[mid].y) < (entity.collisionPoint?.y || entity.y)) {
          low = mid + 1
        } else {
          high = mid
        }
      }
    
      drawList.splice(low, 0, entity)  
    })

    return drawList
  }

  removeEntity (entity) {
    const index = this.entities.indexOf(entity)
    if (index !== -1) {
      this.entities.splice(index, 1)
    }

    const movingIndex = this.movingEntities.indexOf(entity)
    if (movingIndex !== -1) {
      this.movingEntities.splice(movingIndex, 1)
    }
  }

  update (deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime)
    })

    this.movingEntities.forEach(entity => {
      entity.update(deltaTime)
    })
  }

  draw () {
    const drawList = this.getDrawList()
    for (const entity of drawList) {
      entity.draw()
    }
  }

  isPlayer (entity) {
    return entity.type === EntityTypes.Player1 || entity.type === EntityTypes.Player2
  }
  
  isCrop (entity) {
    switch (entity.type) {
      case EntityTypes.Apple:
      case EntityTypes.Carrot:
      case EntityTypes.Cherry:
      case EntityTypes.Corn:
      case EntityTypes.Eggplant:
      case EntityTypes.Lemon:
      case EntityTypes.Lettuce:
      case EntityTypes.Lime:
      case EntityTypes.Maple:
      case EntityTypes.Oak:
      case EntityTypes.Onion:
      case EntityTypes.Orange:
      case EntityTypes.Pepper:
      case EntityTypes.Pine:
      case EntityTypes.Plum:
      case EntityTypes.Potato:
      case EntityTypes.Pumpkin:
      case EntityTypes.Radish:
      case EntityTypes.Strawberry:
      case EntityTypes.Tomato:
      case EntityTypes.Watermelon:
        return true
      default:
        return false
    }
  }
  
  isTree (entity) {
    switch (entity.type) {
      case EntityTypes.AppleTree:
      case EntityTypes.CherryTree:
      case EntityTypes.LemonTree:
      case EntityTypes.LimeTree:
      case EntityTypes.MapleTree:
      case EntityTypes.OakTree:
      case EntityTypes.OrangeTree:
      case EntityTypes.PineTree:
        return true
      default:
        return false
    }
  }
  
  isFish (entity) {
    switch (entity.type) {
      case EntityTypes.Catfish:
      case EntityTypes.Guppy:
      case EntityTypes.Herring:
      case EntityTypes.Minnow:
      case EntityTypes.Pike:
      case EntityTypes.Salmon:
      case EntityTypes.Sardine:
      case EntityTypes.Tuna:
      case EntityTypes.Walleye:
        return true
      default:
        return false
    }
  }
  
  isFlower (entity) {
    switch (entity.type) {
      case EntityTypes.Daffodil:
      case EntityTypes.Sunflower:
      case EntityTypes.Tulip:
      case EntityTypes.WildRose:
        return true
      default:
        return false
    }
  }
  
  isForageable (entity) {
    switch (entity.type) {
      case EntityTypes.Daffodil:
      case EntityTypes.Sunflower:
      case EntityTypes.Truffel:
      case EntityTypes.Tulip:
      case EntityTypes.WildGarlic:
      case EntityTypes.WildRose:
        return true
      default:
        return false
    }
  }
}

function insertEntity (entities, entity) {
  let low = 0
  let high = entities.length

  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    if (entities[mid].y < (entity.collisionPoint?.y || entity.y)) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  entities.splice(low, 0, entity)
}