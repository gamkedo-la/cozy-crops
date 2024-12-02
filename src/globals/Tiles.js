import { WorldIndexes, WorldTileNames, WorldUnwalkable } from './TilesWorld.js'
import { BuildingIndexes, BuildingTileNames, BuildingUnwalkable } from './TilesBuilding.js'
import { SpliceIndexes, SpliceTileNames, SpliceUnwalkable } from './TilesSplice.js'
import { CarpenterIndexes, CarpenterTileNames, CarpenterUnwalkable } from './TilesCarpenter.js'
import { BlacksmithIndexes, BlacksmithTileNames, BlacksmithUnwalkable } from './TilesBlacksmith.js'
import { PlayerHomeIndexes, PlayerHomeTileNames, PlayerHomeUnwalkable } from './TilesPlayerHome.js'
import { StoreIndexes, StoreTileNames, StoreUnwalkable } from './TilesStore.js'
import { MuseumIndexes, MuseumTileNames, MuseumUnwalkable } from './TilesMuseum.js'

export const TileIndexes = {
  ...WorldIndexes,
  ...BuildingIndexes,
  ...SpliceIndexes,
  ...CarpenterIndexes,
  ...BlacksmithIndexes,
  ...PlayerHomeIndexes,
  ...StoreIndexes,
  ...MuseumIndexes
}

export const TileNames = {
  ...WorldTileNames,
  ...BuildingTileNames,
  ...SpliceTileNames,
  ...CarpenterTileNames,
  ...BlacksmithTileNames,
  ...PlayerHomeTileNames,
  ...StoreTileNames,
  ...MuseumTileNames
}

export const UnWalkable = [
  ...WorldUnwalkable,
  ...BuildingUnwalkable,
  ...SpliceUnwalkable,
  ...CarpenterUnwalkable,
  ...BlacksmithUnwalkable,
  ...PlayerHomeUnwalkable,
  ...StoreUnwalkable,
  ...MuseumUnwalkable
]

// export const TileTimes = {
//   [WetSand]: {
//     time: 1000, // milliseconds
//     tileIndex: Sand
//   }
// }