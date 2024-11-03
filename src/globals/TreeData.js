import EntityTypes from './EntityTypes.js'
import { Seasons } from './Calendar.js'

const TreeData = {
  [EntityTypes.AppleTree]: {
    name: EntityTypes.AppleTree,
    seed: EntityTypes.AppleSeed,
    inSeason: Seasons.Hot,
    woodCount: 4,
    daysToGrow: 9,
    bearsFruit: true,
    daysForFruit: 3,
    seedPrice: 19,
    fruitPrice: 4,
    woodPrice: 2,
    health: 150
  },
  [EntityTypes.CherryTree]: {
    name: EntityTypes.CherryTree,
    seed: EntityTypes.CherrySeed,
    inSeason: Seasons.Cool,
    woodCount: 4,
    daysToGrow: 9,
    bearsFruit: true,
    daysForFruit: 3,
    seedPrice: 19,
    fruitPrice: 4,
    woodPrice: 2,
    health: 150
  },
  [EntityTypes.LemonTree]: {
    name: EntityTypes.LemonTree,
    seed: EntityTypes.LemonSeed,
    inSeason: Seasons.Rainy,
    woodCount: 4,
    daysToGrow: 14,
    bearsFruit: true,
    daysForFruit: 4,
    seedPrice: 28,
    fruitPrice: 6,
    woodPrice: 2,
    health: 150
  },
  [EntityTypes.LimeTree]: {
    name: EntityTypes.LimeTree,
    seed: EntityTypes.LimeSeed,
    inSeason: Seasons.Cool,
    woodCount: 4,
    daysToGrow: 14,
    bearsFruit: true,
    daysForFruit: 4,
    seedPrice: 28,
    fruitPrice: 6,
    woodPrice: 2,
    health: 150
  },
  [EntityTypes.MapleTree]: {
    name: EntityTypes.MapleTree,
    seed: EntityTypes.MapleSeed,
    inSeason: null,
    woodCount: 8,
    daysToGrow: 9,
    bearsFruit: false,
    daysForFruit: 0,
    seedPrice: 3,
    fruitPrice: 0,
    woodPrice: 2,
    health: 200
  },
  [EntityTypes.OakTree]: {
    name: EntityTypes.OakTree,
    seed: EntityTypes.OakSeed,
    inSeason: null,
    woodCount: 8,
    daysToGrow: 9,
    bearsFruit: false,
    daysForFruit: 0,
    seedPrice: 3,
    fruitPrice: 0,
    woodPrice: 2,
    health: 200
  },
  [EntityTypes.OrangeTree]: {
    name: EntityTypes.OrangeTree,
    seed: EntityTypes.OrangeSeed,
    inSeason: Seasons.Hot,
    woodCount: 4,
    daysToGrow: 14,
    bearsFruit: true,
    daysForFruit: 4,
    seedPrice: 28,
    fruitPrice: 6,
    woodPrice: 2,
    health: 150
  },
  [EntityTypes.PineTree]: {
    name: EntityTypes.PineTree,
    seed: EntityTypes.PineSeed,
    inSeason: null,
    woodCount: 8,
    daysToGrow: 9,
    bearsFruit: false,
    daysForFruit: 0,
    seedPrice: 3,
    fruitPrice: 0,
    woodPrice: 2,
    health: 200
  },
  [EntityTypes.PlumTree]: {
    name: EntityTypes.PlumTree,
    seed: EntityTypes.PlumSeed,
    inSeason: Seasons.Cool,
    woodCount: 4,
    daysToGrow: 9,
    bearsFruit: true,
    daysForFruit: 3,
    seedPrice: 19,
    fruitPrice: 4,
    woodPrice: 2,
    health: 150
  }
}

export const {
  AppleTree,
  CherryTree,
  LemonTree,
  LimeTree,
  MapleTree,
  OakTree,
  OrangeTree,
  PineTree,
  PlumTree
} = TreeData

export default TreeData
