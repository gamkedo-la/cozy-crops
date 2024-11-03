import EntityTypes from './EntityTypes.js'
import { Seasons } from './Calendar.js'

const ForagableData = {
  [EntityTypes.Daffodil]: {
    name: EntityTypes.Daffodil,
    inSeason: Seasons.Cool,
    probability: 3 / 13,
    sellingPrice: 5
  },
  [EntityTypes.Sunflower]: {
    name: EntityTypes.Sunflower,
    inSeason: Seasons.Hot,
    probability: 2 / 13,
    sellingPrice: 10
  },
  [EntityTypes.Truffel]: {
    name: EntityTypes.Truffel,
    inSeason: Seasons.Cool,
    probability: 1 / 13,
    sellingPrice: 20,
  },
  [EntityTypes.Tulip]: {
    name: EntityTypes.Tulip,
    inSeason: Seasons.Rainy,
    probability: 3 / 13,
    sellingPrice: 5
  },
  [EntityTypes.WildGarlic]: {
    name: EntityTypes.WildGarlic,
    inSeason: Seasons.Hot,
    probability: 2 / 13,
    sellingPrice: 15
  },
  [EntityTypes.WildRose]: {
    name: EntityTypes.WildRose,
    inSeason: Seasons.Rainy,
    probability: 2 / 13,
    sellingPrice: 10
  }
}

export const Daffodil = ForagableData[EntityTypes.Daffodil]
export const Sunflower = ForagableData[EntityTypes.Sunflower]
export const Truffel = ForagableData[EntityTypes.Truffel]
export const Tulip = ForagableData[EntityTypes.Tulip]
export const WildGarlic = ForagableData[EntityTypes.WildGarlic]
export const WildRose = ForagableData[EntityTypes.WildRose]

export default ForagableData