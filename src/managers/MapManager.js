import MapData, { Player1Start, Player2Start } from '../globals/Map.js'
import { TileHeight, TileWidth } from '../globals/Constants.js'
import { TileSet } from '../globals/Images.js'
import { Player1, Player2 } from '../globals/EntityTypes.js'
import { Sand, TileNames, WetSand } from '../globals/Tiles.js'

export default class MapManager {
  constructor (config) {
    Object.assign(this, config)
    this.tileImage = null
    this.tilesPerRow = null
    this.mapCanvas = null
    this.mapCtx = null
    this.worldDimensions = {
      pixels: {
        width: MapData[0].length * TileWidth,
        height: MapData.length * TileHeight
      },
      tiles: {
        width: MapData[0].length,
        height: MapData.length
      }
    }
  }

  start (modifiedTiles) {
    this.tileImage = this.imageManager.getImageWithSrc(TileSet)
    this.tilesPerRow = this.tileImage.width / TileWidth

    this.mapCanvas = document.createElement('canvas')
    this.mapCtx = this.mapCanvas.getContext('2d')

    this.mapCanvas.width = MapData[0].length * TileWidth
    this.mapCanvas.height = MapData.length * TileHeight

    for (let y = 0; y < MapData.length; y++) {
      for (let x = 0; x < MapData[y].length; x++) {
        const mapData = MapData[y][x]
        const imageX = (mapData % this.tilesPerRow) * TileWidth
        const imageY = (Math.floor(mapData / this.tilesPerRow)) * TileHeight
        this.mapCtx.drawImage(
          this.tileImage,
          imageX, imageY, TileWidth, TileHeight,
          x * TileWidth, y * TileHeight, TileWidth, TileHeight
        )
      }
    }

    for (const tile of modifiedTiles) {
      this.updateTileAtXY(tile.x, tile.y, tile.tileIndex)
    }
  }

  update (deltaTime) {
    this.gameManager.getModifiedTiles().forEach(tile => {
      if (!isNaN(tile.replacement.time)) {
        tile.replacement.time -= deltaTime
        if (tile.replacement.time <= 0) {
          this.updateTileAtXY(tile.x, tile.y, tile.replacement.tileIndex)
          this.gameManager.setModifiedTile(tile.x, tile.y, tile.replacement.tileIndex, getTimeForTileIndex(tile.replacement.tileIndex))
        } else {
          this.gameManager.updateTimeForModifiedTile(tile.x, tile.y, tile.replacement.tileIndex, tile.replacement.time)
        }
      }
    })
  }

  unWaterAllTiles () {
    this.gameManager.getWateredTiles().forEach(tile => {
      this.updateTileAtXY(tile.x, tile.y, Sand)
      this.gameManager.setModifiedTile(tile.x, tile.y, Sand, getTimeForTileIndex(Sand))
    })
  }

  getPlayerStart (playerType) {
    if (playerType === Player1) {
      return Player1Start
    } else if (playerType === Player2) {
      return Player2Start
    }
  }

  drawMap () {
    this.imageManager.drawGround(this.mapCanvas, 0, 0, this.mapCanvas.width, this.mapCanvas.height)
  }

  updateTileAtXY (x, y, tileIndex) {
    const imageX = (tileIndex % this.tilesPerRow) * TileWidth
    const imageY = (Math.floor(tileIndex / this.tilesPerRow)) * TileHeight
    this.mapCtx.drawImage(
      this.tileImage,
      imageX, imageY, TileWidth, TileHeight,
      x * TileWidth, y * TileHeight, TileWidth, TileHeight
    )
    MapData[y][x] = tileIndex
  }

  updateTileAtPixelPos (x, y, tileIndex) {
    if (isNaN(tileIndex)) {
      tileIndex = getTileIndexByName(tileIndex)
    }
    const tileX = Math.floor(x / TileWidth)
    const tileY = Math.floor(y / TileHeight)
    this.updateTileAtXY(tileX, tileY, tileIndex)
    this.gameManager.setModifiedTile(tileX, tileY, tileIndex, getTimeForTileIndex(tileIndex))
  }

  getTileAtXY (x, y) {
    try {
      return MapData[y][x]      
    } catch (error) {
      console.log('Map Width in Tiles:', MapData[0].length)
      console.log('Map Height in Tiles:', MapData.length)
      console.error('Error getting tile at x, y:', x, y)
    }
  }

  getTileAtPixelPos (x, y) {
    const tileX = Math.floor(x / TileWidth)
    const tileY = Math.floor(y / TileHeight)
    return this.getTileAtXY(tileX, tileY)
  }

  getTileTypeAtPixelPos (x, y) {
    const tileIndex = this.getTileAtPixelPos(x, y)
    return TileNames[tileIndex]
  }

  getTileTopLeftAtPixelPos (x, y) {
    const tileX = (Math.floor(x / TileWidth)) * TileWidth
    const tileY = (Math.floor(y / TileHeight)) * TileHeight
    return {
      x: tileX,
      y: tileY
    }
  }

  getRandomTilePos (mustBeWalkable = true) {
    let x, y, tileIsWalkable
    do {
      x = Math.floor(Math.random() * this.worldDimensions.pixels.width)
      y = Math.floor(Math.random() * this.worldDimensions.pixels.height)
      const tile = this.getTileAtPixelPos(x, y)
      if (mustBeWalkable) {
        tileIsWalkable = this.collisionManager.playerCanWalk(tile)
        if (tileIsWalkable) {
          const tilePos = this.getTileTopLeftAtPixelPos(x, y)
          x = tilePos.x
          y = tilePos.y
        }
      }
    } while (mustBeWalkable && !tileIsWalkable)

    return { x, y }
  }
}

function getTileIndexByName(index) {
  return Object.keys(TileNames).find(key => TileNames[key] === index) || null
}

function getTimeForTileIndex (tileIndex) {
  return {
    tileIndex,
    time: 'permanent'
  }
}
