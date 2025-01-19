import EntityTypes from '../globals/EntityTypes.js'
import { TileWidth, TileHeight } from '../globals/Constants.js'

export default class EntityManager {
  constructor (config) {
    Object.assign(this, config)

    this.entities = []
    this.movingEntities = []
    this.aboveGroundEntities = []
  }

  addEntity (entity, canMove = false, isAboveGround = false) {
    if (isAboveGround) {
      this.aboveGroundEntities.push(entity)
    } else if (canMove) {
      this.movingEntities.push(entity)
    } else {
      insertEntity(this.entities, entity)
    }
  }

  getDrawList () {
    const drawList  = this.entities.filter(entity => entity.imageManager.isOnScreen(entity.x, entity.y, entity.width, entity.height))
    const movingEntitiesToAdd = this.movingEntities.filter(entity => entity.imageManager.isOnScreen(entity.x, entity.y, entity.width, entity.height))

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
      low = 0
      high = drawList.length
    })

    return [...drawList, ...(this.aboveGroundEntities.filter(entity => entity.imageManager.isOnScreen(entity.x, entity.y, entity.width, entity.height)))]
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

    this.aboveGroundEntities.forEach(entity => {
      entity.update(deltaTime)
    })
  }

  draw () {
    const drawList = this.getDrawList()
    for (const entity of drawList) {
      entity.draw()
    }
  }

  getEntitiesAt (x, y) {
    const entities = []
    for (const entity of this.entities) {
      if (
        entity.collisionPoint.x >= x &&
        entity.collisionPoint.x <= x + TileWidth &&
        entity.collisionPoint.y >= y &&
        entity.collisionPoint.y <= y + TileHeight
      ) {
        entities.push(entity)
      }
    }

    return entities
  }

  isPlayer (entity) {
    if (!entity) return false

    return entity.type === EntityTypes.Player1 || entity.type === EntityTypes.Player2
  }
  
  isCrop (entity) {
    if (!entity) return false

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

  isShortCropSeed (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.CarrotSeed:
      case EntityTypes.LettuceSeed:
      case EntityTypes.OnionSeed:
      case EntityTypes.PotatoSeed:
      case EntityTypes.PumpkinSeed:
      case EntityTypes.RadishSeed:
      case EntityTypes.TomatoSeed:
      case EntityTypes.WatermelonSeed:
        return true
      default:
        return false
    }
  }

  isTallCrop (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.Corn:
      case EntityTypes.Eggplant:
      case EntityTypes.Pepper:
      case EntityTypes.Strawberry:
        return true
      default:
        return false
    }
  }

  isTallCropSeed (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.CornSeed:
      case EntityTypes.EggplantSeed:
      case EntityTypes.PepperSeed:
      case EntityTypes.StrawberrySeed:
        return true
      default:
        return false
    }
  }

  isTreeSeed (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.AppleSeed:
      case EntityTypes.CherrySeed:
      case EntityTypes.LemonSeed:
      case EntityTypes.LimeSeed:
      case EntityTypes.MapleSeed:
      case EntityTypes.OakSeed:
      case EntityTypes.OrangeSeed:
      case EntityTypes.PineSeed:
      case EntityTypes.PlumSeed:
        return true
      default:
        return false
    }
  }

  isFish (entity) {
    if (!entity) return false

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
    if (!entity) return false

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
    if (!entity) return false

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

  isSeed (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.AppleSeed:
      case EntityTypes.CarrotSeed:
      case EntityTypes.CherrySeed:
      case EntityTypes.CornSeed:
      case EntityTypes.EggplantSeed:
      case EntityTypes.LemonSeed:
      case EntityTypes.LettuceSeed:
      case EntityTypes.LimeSeed:
      case EntityTypes.MapleSeed:
      case EntityTypes.OakSeed:
      case EntityTypes.OnionSeed:
      case EntityTypes.OrangeSeed:
      case EntityTypes.PepperSeed:
      case EntityTypes.PineSeed:
      case EntityTypes.PlumSeed:
      case EntityTypes.PotatoSeed:
      case EntityTypes.PumpkinSeed:
      case EntityTypes.RadishSeed:
      case EntityTypes.StrawberrySeed:
      case EntityTypes.TomatoSeed:
      case EntityTypes.WatermelonSeed:
        return true
      default:
        return false
    }
  }

  isTool (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.AxeCopper:
      case EntityTypes.AxeSteel:
      case EntityTypes.AxeTitanium:
      case EntityTypes.FishingRodBamboo:
      case EntityTypes.FishingRodFiberglass:
      case EntityTypes.FishingRodSteel:
      case EntityTypes.HoeCopper:
      case EntityTypes.HoeSteel:
      case EntityTypes.HoeWooden:
      case EntityTypes.ShovelCopper:
      case EntityTypes.ShovelSteel:
      case EntityTypes.ShovelWooden:
      case EntityTypes.WateringCanCopper:
      case EntityTypes.WateringCanSteel:
      case EntityTypes.WateringCanWooden:
        return true
      default:
        return false
    }
  }

  isBaseTool (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.AxeCopper:
      case EntityTypes.FishingRodBamboo:
      case EntityTypes.HoeWooden:
      case EntityTypes.ShovelWooden:
      case EntityTypes.WateringCanWooden:
        return true
      default:
        return false
    }
  }

  isUpgradedTool (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.AxeSteel:
      case EntityTypes.FishingRodFiberglass:
      case EntityTypes.HoeCopper:
      case EntityTypes.ShovelCopper:
      case EntityTypes.WateringCanCopper:
        return true
      default:
        return false
    }
  }

  isPremiumTool (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.AxeTitanium:
      case EntityTypes.FishingRodSteel:
      case EntityTypes.HoeSteel:
      case EntityTypes.ShovelSteel:
      case EntityTypes.WateringCanSteel:
        return true
      default:
        return false
    }
  }

  isAxe (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.AxeCopper:
      case EntityTypes.AxeSteel:
      case EntityTypes.AxeTitanium:
        return true
      default:
        return false
    }
  }

  isFishingRod (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.FishingRodBamboo:
      case EntityTypes.FishingRodFiberglass:
      case EntityTypes.FishingRodSteel:
        return true
      default:
        return false
    }
  }

  isHarvestable (entity) {
    if (!entity) return false

    if (this.isForageable(entity)) return true
    if (this.isCrop(entity) && entity.growthStages[entity.currentGrowthStage] === 'MaturePlant') return true
    // Need to check for trees and if they have fruit, or if they've been chopped into wood

    return false
  }

  isClearable (entity) {
    if (!entity) return false

    if (this.isCrop(entity) && entity.getGrowthStage() === 'Dead') return true

    return false
  }

  isChoppable (entity) {
    if (!entity) return false

    if (this.isTree(entity) && entity.getGrowthStage() != 'Stump') return true

    return false
  }

  isFuiting (entity) {
    if (!entity || !this.isTree(entity)) return false

    if (entity.getGrowthStage() === 'FruitingTree') return true

    return false
  }

  isFurniture (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.BedTwin:
      case EntityTypes.BedQueen:
      case EntityTypes.FireplaceBrick:
      case EntityTypes.FireplaceStone:
      case EntityTypes.LowerCabinetBrown:
      case EntityTypes.LowerCabinetWhite:
      case EntityTypes.UpperCabinetBrown:
      case EntityTypes.UpperCabinetGray:
      case EntityTypes.RefrigeratorGray:
      case EntityTypes.RefrigeratorSilver:
      case EntityTypes.SleepingBag2:
      case EntityTypes.StoveGray:
      case EntityTypes.StoveWhite:
      case EntityTypes.WallPaperGray:
      case EntityTypes.WallPaperPurple:
      case EntityTypes.WallPaperRed:
      case EntityTypes.WallPaperStriped:
      case EntityTypes.WallPaperTan:
      case EntityTypes.WallPaperVerticalWood:
      case EntityTypes.WallPaperWoodTiles:
      case EntityTypes.WallPaperX:
        return true
      default:
        return false
    }
  }

  isHoe (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.HoeCopper:
      case EntityTypes.HoeSteel:
      case EntityTypes.HoeWooden:
        return true
      default:
        return false
    }
  }

  isShovel (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.ShovelCopper:
      case EntityTypes.ShovelSteel:
      case EntityTypes.ShovelWooden:
        return true
      default:
        return false
    }
  }

  isWateringCan (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.WateringCanCopper:
      case EntityTypes.WateringCanSteel:
      case EntityTypes.WateringCanWooden:
        return true
      default:
        return false
    }
  }
  
  isTree (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.AppleTree:
      case EntityTypes.CherryTree:
      case EntityTypes.LemonTree:
      case EntityTypes.LimeTree:
      case EntityTypes.MapleTree:
      case EntityTypes.OakTree:
      case EntityTypes.OrangeTree:
      case EntityTypes.PineTree:
      case EntityTypes.PlumTree:
        return true
      default:
        return false
    }
  }

  isTreeFruit (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.Apple:
      case EntityTypes.Cherry:
      case EntityTypes.Lemon:
      case EntityTypes.Lime:
      case EntityTypes.MapleSyrup:
      case EntityTypes.Orange:
      case EntityTypes.Plum:
        return true
      default:
        return false
    }
  }

  isWood (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.AppleWood:
      case EntityTypes.CherryWood:
      case EntityTypes.LemonWood:
      case EntityTypes.LimeWood:
      case EntityTypes.MapleWood:
      case EntityTypes.OakWood:
      case EntityTypes.OrangeWood:
      case EntityTypes.PineWood:
      case EntityTypes.PlumWood:
        return true
      default:
        return false
    }
  }

  isPlaque (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.PlaqueFarming:
      case EntityTypes.PlaqueFishing:
      case EntityTypes.PlaqueForaging:
      case EntityTypes.PlaqueFurniture:
      case EntityTypes.PlaqueSelling:
        return true
      default:
        return false
    }
  }

  isPortrait (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.PortraitMona:
      case EntityTypes.PortraitPearl:
      case EntityTypes.PortraitRGB:
      case EntityTypes.PortraitStarry:
      case EntityTypes.PortraitWave:
        return true
      default:
        return false
    }
  }

  isStatue (entity) {
    if (!entity) return false

    switch (entity.type) {
      case EntityTypes.StatueBust:
      case EntityTypes.StatueFossil:
      case EntityTypes.StatueMoai:
      case EntityTypes.StatuePharaoh:
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