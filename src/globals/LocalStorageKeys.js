const LocalStorageKeys = {
  Player1: {
    Colors: {
      Body: 'Player1Body',
      Hair: 'Player1Hair',
      Shirt: 'Player1Shirt',
      Pants: 'Player1Pants'
    },
    Syles: {
      Hair: 'Player1HairStyle',
      Shirt: 'Player1ShirtStyle',
      Pants: 'Player1PantsStyle'
    },
    Controls: 'Player1Controls',
    Stamina: 'Player1Stamina',
  },
  Player2: {
    Colors: {
      Body: 'Player2Body',
      Hair: 'Player2Hair',
      Shirt: 'Player2Shirt',
      Pants: 'Player2Pants'
    },
    Syles: {
      Hair: 'Player2HairStyle',
      Shirt: 'Player2ShirtStyle',
      Pants: 'Player2PantsStyle'
    },
    Controls: 'Player2Controls',
    Stamina: 'Player2Stamina'
  },
  Inventory: 'Inventory',
  Money: 'Money',
  SaveSlot: 'SaveSlot',
  SlotList: 'SlotList'
}

export default LocalStorageKeys
export const {
  Player1,
  Player2,
  Inventory,
  Money,
  SaveSlot,
  SlotList
} = LocalStorageKeys