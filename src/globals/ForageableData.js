import EntityTypes from './EntityTypes.js'
import { Seasons } from './Calendar.js'

const ForageableData = {
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

export const Daffodil = ForageableData[EntityTypes.Daffodil]
export const Sunflower = ForageableData[EntityTypes.Sunflower]
export const Truffel = ForageableData[EntityTypes.Truffel]
export const Tulip = ForageableData[EntityTypes.Tulip]
export const WildGarlic = ForageableData[EntityTypes.WildGarlic]
export const WildRose = ForageableData[EntityTypes.WildRose]

export default ForageableData