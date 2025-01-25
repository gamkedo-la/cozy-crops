export const Empty = 0
export const Stone = 1
export const Water = 2
export const Sand = 3
export const RockyGround = 4
export const Grass1 = 5
export const Pink = 6
export const Bridge = 7
export const HorizontalStripe = 8
export const Dock = 9
export const Grass3 = 10
export const HorizontalRamp = 11
export const Empty2 = 12
export const DarkStone = 13
export const Seafoam = 14
export const WetSand = 15
export const Waterfall = 19
export const Path = 31
export const GrassWaterUL = 66
export const GrassWaterUR = 67
export const GrassWaterDL = 98
export const GrassWaterDR = 99
export const RockyPathUL = 70
export const RockyPathUR = 71
export const RockyPathDL = 72
export const RockyPathDR = 73
export const GrassPathUL = 74
export const GrassPathUR = 75
export const GrassPathDL = 76
export const GrassPathDR = 77
export const Grass5 = 128
export const fencefull = 160
export const fenceleft = 161
export const fenceright = 162
export const fencevert = 163
export const NearShoreOcean = 164
export const LockedDoor = 165
export const fishingSpot = 166
export const dockTop = 167
export const dockBottom = 168

export const WorldIndexes = {
  Bridge,
  DarkStone,
  Empty,
  Empty2,
  fencefull,
  fenceleft,
  fenceright,
  fencevert,
  Grass1,
  Grass3,
  GrassPathDL,
  GrassPathDR,
  GrassPathUL,
  GrassPathUR,
  GrassWaterDL,
  GrassWaterDR,
  GrassWaterUL,
  GrassWaterUR,
  HorizontalRamp,
  HorizontalStripe,
  LockedDoor,
  NearShoreOcean,
  Path,
  Pink,
  RockyGround,
  RockyPathDL,
  RockyPathDR,
  RockyPathUL,
  RockyPathUR,
  Sand,
  Seafoam,
  Stone,
  Water,
  Waterfall,
  WetSand,
  fishingSpot,
  dockTop,
  dockBottom
}

export const WorldTileNames = {
  [Bridge]: 'Bridge',
  [DarkStone]: 'DarkStone',
  [Empty]: 'Empty',
  [Empty2]: 'Empty2',
  [fencefull]: 'fencefull',
  [fenceleft]: 'fenceleft',
  [fenceright]: 'fenceright',
  [fencevert]: 'fencevert',
  [Grass1]: 'Grass1',
  [Grass3]: 'Grass3',
  [Grass5]: 'Grass5',
  [GrassPathDL]: 'GrassPathDL',
  [GrassPathDR]: 'GrassPathDR',
  [GrassPathUL]: 'GrassPathUL',
  [GrassPathUR]: 'GrassPathUR',
  [GrassWaterDL]: 'GrassWaterDL',
  [GrassWaterDR]: 'GrassWaterDR',
  [GrassWaterUL]: 'GrassWaterUL',
  [GrassWaterUR]: 'GrassWaterUR',
  [HorizontalRamp]: 'HorizontalRamp',
  [HorizontalStripe]: 'HorizontalStripe',
  [LockedDoor]: 'LockedDoor',
  [NearShoreOcean]: 'NearShoreOcean',
  [Path]: 'Path',
  [Pink]: 'Pink',
  [RockyGround]: 'RockyGround',
  [RockyPathDL]: 'RockyPathDL',
  [RockyPathDR]: 'RockyPathDR',
  [RockyPathUL]: 'RockyPathUL',
  [RockyPathUR]: 'RockyPathUR',
  [Sand]: 'Sand',
  [Seafoam]: 'Seafoam',
  [Stone]: 'Stone',
  [Water]: 'Water',
  [Waterfall]: 'Waterfall',
  [WetSand]: 'WetSand',
  [fishingSpot]: 'fishingSpot',
  [dockTop]: 'dockTop',
  [dockBottom]: 'dockBottom'
}

export const WorldUnwalkable = [
  fencefull,
  fenceleft,
  fenceright,
  fencevert,
  LockedDoor,
  NearShoreOcean,
  Pink,
  RockyGround,
  Waterfall,
  Water,
  dockBottom,
  dockTop,
  fishingSpot
]

const grassTiles = [Grass1, Grass3]
export function isGrass (index) {
  return grassTiles.includes(index)
}

const sandTiles = [Sand, WetSand]
export function isSand (index) {
  return sandTiles.includes(index)
}
