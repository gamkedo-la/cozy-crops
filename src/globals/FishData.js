import EntityTypes from './EntityTypes.js'
import { Seasons } from './Calendar.js'

const FishData = {
  [EntityTypes.Catfish]: {
    name: EntityTypes.Catfish,
    type: EntityTypes.Catfish,
    size: 'medium',
    inSeason: Seasons.Rainy,
    probability: 0.1,
    staminaToCatch: 10,
    staminaRestored: 10,
    sellingPrice: 10,
  },
  [EntityTypes.Guppy]: {
    name: EntityTypes.Guppy,
    type: EntityTypes.Guppy,
    size: 'small',
    inSeason: Seasons.Rainy,
    probability: 0.1,
    staminaToCatch: 5,
    staminaRestored: 5,
    sellingPrice: 5,
  },
  [EntityTypes.Herring]: {
    name: EntityTypes.Herring,
    type: EntityTypes.Herring,
    size: 'medium',
    inSeason: Seasons.Rainy,
    probability: 0.1,
    staminaToCatch: 10,
    staminaRestored: 10,
    sellingPrice: 10,
  },
  [EntityTypes.Minnow]: {
    name: EntityTypes.Minnow,
    type: EntityTypes.Minnow,
    size: 'small',
    inSeason: Seasons.Rainy,
    probability: 0.1,
    staminaToCatch: 5,
    staminaRestored: 5,
    sellingPrice: 5,
  },
  [EntityTypes.Pike]: {
    name: EntityTypes.Pike,
    type: EntityTypes.Pike,
    size: 'medium',
    inSeason: Seasons.Rainy,
    probability: 0.1,
    staminaToCatch: 10,
    staminaRestored: 10,
    sellingPrice: 10,
  },
  [EntityTypes.Salmon]: {
    name: EntityTypes.Salmon,
    type: EntityTypes.Salmon,
    size: 'large',
    inSeason: Seasons.Rainy,
    probability: 0.1,
    staminaToCatch: 15,
    staminaRestored: 15,
    sellingPrice: 15,
  },
  [EntityTypes.Sardine]: {
    name: EntityTypes.Sardine,
    type: EntityTypes.Sardine,
    size: 'small',
    inSeason: Seasons.Rainy,
    probability: 0.1,
    staminaToCatch: 5,
    staminaRestored: 5,
    sellingPrice: 5,
  },
  [EntityTypes.Tuna]: {
    name: EntityTypes.Tuna,
    type: EntityTypes.Tuna,
    size: 'large',
    inSeason: Seasons.Rainy,
    probability: 0.1,
    staminaToCatch: 15,
    staminaRestored: 15,
    sellingPrice: 15,
  },
  [EntityTypes.Walleye]: {
    name: EntityTypes.Walleye,
    type: EntityTypes.Walleye,
    size: 'large',
    inSeason: Seasons.Rainy,
    probability: 0.1,
    staminaToCatch: 15,
    staminaRestored: 15,
    sellingPrice: 15,
  }
}

export default FishData
export const {
  Catfish,
  Guppy,
  Herring,
  Minnow,
  Pike,
  Salmon,
  Sardine,
  Tuna,
  Walleye
} = FishData
