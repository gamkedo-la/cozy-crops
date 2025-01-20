import EntityTypes from './EntityTypes.js'

const FurnitureData = {
  [EntityTypes.BedTwin]: {
    type: EntityTypes.BedTwin,
    price: 10,
    name: 'Twin Bed',
    sellingPrice: 25
  },
  [EntityTypes.BedQueen]: {
    type: EntityTypes.BedQueen,
    price: 20,
    name: 'Queen Bed',
    sellingPrice: 50
  },
  [EntityTypes.FireplaceBrick]: {
    type: EntityTypes.FireplaceBrick,
    price: 15,
    name: 'Brick Fireplace',
    sellingPrice: 35
  },
  [EntityTypes.FireplaceStone]: {
    type: EntityTypes.FireplaceStone,
    price: 15,
    name: 'Stone Fireplace',
    sellingPrice: 45
  },
  [EntityTypes.LowerCabinetBrown]: {
    type: EntityTypes.LowerCabinetBrown,
    price: 15,
    name: 'Brown Cabinet',
    sellingPrice: 35
  },
  [EntityTypes.LowerCabinetWhite]: {
    type: EntityTypes.LowerCabinetWhite,
    price: 20,
    name: 'White Cabinet',
    sellingPrice: 45
  },
  [EntityTypes.RefrigeratorGray]: {
    type: EntityTypes.RefrigeratorGray,
    price: 7,
    name: 'Gray Refrigerator',
    sellingPrice: 20
  },
  [EntityTypes.RefrigeratorSilver]: {
    type: EntityTypes.RefrigeratorSilver,
    price: 15,
    name: 'Silver Refrigerator',
    sellingPrice: 35
  },
  [EntityTypes.SleepingBag2]: {
    type: EntityTypes.SleepingBag2,
    price: 5,
    name: 'Sleeping Bag',
    sellingPrice: 10
  },
  [EntityTypes.StoveGray]: {
    type: EntityTypes.StoveGray,
    price: 10,
    name: 'Gray Stove',
    sellingPrice: 25
  },
  [EntityTypes.StoveWhite]: {
    type: EntityTypes.StoveWhite,
    price: 15,
    name: 'White Stove',
    sellingPrice: 35
  },
  [EntityTypes.UpperCabinetBrown]: {
    type: EntityTypes.UpperCabinetBrown,
    price: 10,
    name: 'Brown Cupboard',
    sellingPrice: 25
  },
  [EntityTypes.UpperCabinetGray]: {
    type: EntityTypes.UpperCabinetGray,
    price: 15,
    name: 'Gray Cupboard',
    sellingPrice: 35
  },
  [EntityTypes.WallPaperGray]: {
    type: EntityTypes.WallPaperGray,
    price: 20,
    name: 'Gray Wallpaper',
    sellingPrice: 45
  },
  [EntityTypes.FlooringPurple]: {
    type: EntityTypes.FlooringPurple,
    price: 20,
    name: 'Purple Wallpaper',
    sellingPrice: 45
  },
  [EntityTypes.WallPaperAuburn]: {
    type: EntityTypes.WallPaperAuburn,
    price: 20,
    name: 'Red Wallpaper',
    sellingPrice: 45
  },
  [EntityTypes.WallPaperStriped]: {
    type: EntityTypes.WallPaperStriped,
    price: 20,
    name: 'Striped Wallpaper',
    sellingPrice: 45
  },
  [EntityTypes.WallPaperTan]: {
    type: EntityTypes.WallPaperTan,
    price: 20,
    name: 'Tan Wallpaper',
    sellingPrice: 45
  },
  [EntityTypes.FlooringWood]: {
    type: EntityTypes.FlooringWood,
    price: 20,
    name: 'Wood Wallpaper',
    sellingPrice: 45
  },
  [EntityTypes.FlooringHerringbone]: {
    type: EntityTypes.FlooringHerringbone,
    price: 20,
    name: 'Tile Wallpaper',
    sellingPrice: 45
  },
  [EntityTypes.FlooringCrosshatch]: {
    type: EntityTypes.FlooringCrosshatch,
    price: 20,
    name: 'X Wallpaper',
    sellingPrice: 45
  }
}

export const {
  BedTwin,
  BedQueen,
  FireplaceBrick,
  FireplaceStone,
  LowerCabinetBrown,
  LowerCabinetWhite,
  RefrigeratorGray,
  RefrigeratorSilver,
  SleepingBag2,
  StoveGray,
  StoveWhite,
  UpperCabinetBrown,
  UpperCabinetGray,
  WallPaperGray,
  FlooringPurple,
  WallPaperAuburn,
  WallPaperStriped,
  WallPaperTan,
  FlooringWood,
  FlooringHerringbone,
  FlooringCrosshatch
} = FurnitureData

export default FurnitureData