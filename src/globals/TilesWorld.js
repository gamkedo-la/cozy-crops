export const Empty = 0
export const Stone = 1
export const Water = 2
export const Sand = 3
export const RockyGround = 4
export const Grass1 = 5
export const Pink = 6
export const Bridge = 7
export const HorizontalStripe = 8
export const Grass2 = 9
export const Grass3 = 10
export const Grass4 = 11
export const Empty2 = 12
export const DarkStone = 13
export const Seafoam = 14
export const WetSand = 15
export const Waterfall = 19
export const Hilltop = 10
export const Grass5 = 128
export const fencefull = 160
export const fenceleft = 161
export const fenceright = 162
export const fencevert = 163
export const NearShoreOcean = 164
export const LockedDoor = 165

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
  Grass2,
  Grass3,
  Grass4,
  Grass5,
  Hilltop,
  HorizontalStripe,
  LockedDoor,
  NearShoreOcean,
  Pink,
  RockyGround,
  Sand,
  Seafoam,
  Stone,
  Water,
  Waterfall,
  WetSand
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
  [Grass2]: 'Grass2',
  [Grass3]: 'Grass3',
  [Grass4]: 'Grass4',
  [Grass5]: 'Grass5',
  [Hilltop]: 'Hilltop',
  [HorizontalStripe]: 'HorizontalStripe',
  [LockedDoor]: 'LockedDoor',
  [NearShoreOcean]: 'NearShoreOcean',
  [Pink]: 'Pink',
  [RockyGround]: 'RockyGround',
  [Sand]: 'Sand',
  [Seafoam]: 'Seafoam',
  [Stone]: 'Stone',
  [Water]: 'Water',
  [Waterfall]: 'Waterfall',
  [WetSand]: 'WetSand'
}

export const WorldUnwalkable = [
  fencefull,
  fenceleft,
  fenceright,
  fencevert,
  Hilltop,
  LockedDoor,
  NearShoreOcean,
  Pink,
  RockyGround,
  Waterfall,
  Water,
]

const grassTiles = [Grass1, Grass2, Grass3, Grass4, Grass5]
export function isGrass (index) {
  return grassTiles.includes(index)
}

const sandTiles = [Sand, WetSand]
export function isSand (index) {
  return sandTiles.includes(index)
}
