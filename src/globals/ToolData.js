import EntityTypes from './EntityTypes.js'

const ToolData = {
  [EntityTypes.HoeWooden]: {
    type: EntityTypes.HoeWooden,
    price: 50,
    name: 'Wooden Hoe',
    level: 0,
    sellingPrice: 25,
    size: 'singleSquare'
  },
  [EntityTypes.HoeCopper]: {
    type: EntityTypes.HoeCopper,
    price: 100,
    name: 'Copper Hoe',
    level: 1,
    sellingPrice: 50,
    size: 'threeSquares'
  },
  [EntityTypes.HoeSteel]: {
    type: EntityTypes.HoeSteel,
    price: 200,
    name: 'Steel Hoe',
    level: 2,
    sellingPrice: 100,
    size: 'nineSquares'
  },
  [EntityTypes.AxeCopper]: {
    type: EntityTypes.AxeCopper,
    price: 50,
    name: 'Copper Axe',
    level: 0,
    sellingPrice: 25,
    damage: 50
  },
  [EntityTypes.AxeSteel]: {
    type: EntityTypes.AxeSteel,
    price: 100,
    name: 'Steel Axe',
    level: 1,
    sellingPrice: 50,
    damage: 100
  },
  [EntityTypes.AxeTitanium]: {
    type: EntityTypes.AxeTitanium,
    price: 200,
    name: 'Titanium Axe',
    level: 2,
    sellingPrice: 100,
    damage: 200
  },
  [EntityTypes.FishingRodBamboo]: {
    type: EntityTypes.FishingRodBamboo,
    price: 50,
    name: 'Bamboo Fishing Rod',
    level: 0,
    sellingPrice: 25,
    speed: 1,
  },
  [EntityTypes.FishingRodFiberglass]: {
    type: EntityTypes.FishingRodFiberglass,
    price: 100,
    name: 'Fiberglass Fishing Rod',
    level: 1,
    sellingPrice: 50,
    speed: 2,
  },
  [EntityTypes.FishingRodSteel]: {
    type: EntityTypes.FishingRodSteel,
    price: 200,
    name: 'Steel Fishing Rod',
    level: 2,
    sellingPrice: 100,
    speed: 3,
  },
  [EntityTypes.ShovelWooden]: {
    type: EntityTypes.ShovelWooden,
    price: 50,
    name: 'Wooden Shovel',
    level: 0,
    sellingPrice: 25,
    size: 'singleSquare'
  },
  [EntityTypes.ShovelCopper]: {
    type: EntityTypes.ShovelCopper,
    price: 100,
    name: 'Copper Shovel',
    level: 1,
    sellingPrice: 50,
    size: 'threeSquares'
  },
  [EntityTypes.ShovelSteel]: {
    type: EntityTypes.ShovelSteel,
    price: 200,
    name: 'Steel Shovel',
    level: 2,
    sellingPrice: 100,
    size: 'nineSquares'
  },
  [EntityTypes.WateringCanWooden]: {
    type: EntityTypes.WateringCanWooden,
    price: 50,
    name: 'Wooden Watering Can',
    level: 0,
    sellingPrice: 25,
    size: 'singleSquare'
  },
  [EntityTypes.WateringCanCopper]: {
    type: EntityTypes.WateringCanCopper,
    price: 100,
    name: 'Copper Watering Can',
    level: 1,
    sellingPrice: 50,
    size: 'threeSquares'
  },
  [EntityTypes.WateringCanSteel]: {
    type: EntityTypes.WateringCanSteel,
    price: 200,
    name: 'Steel Watering Can',
    level: 2,
    sellingPrice: 100,
    size: 'nineSquares'
  }
}

export const {
  HoeWooden,
  HoeCopper,
  HoeSteel,
  AxeCopper,
  AxeSteel,
  AxeTitanium,
  FishingRodBamboo,
  FishingRodFiberglass,
  FishingRodSteel,
  ShovelWooden,
  ShovelCopper,
  ShovelSteel,
  WateringCanWooden,
  WateringCanCopper,
  WateringCanSteel
} = ToolData

export default ToolData