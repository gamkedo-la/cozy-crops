import MapData, { Player1Start, Player2Start, mapPosition, NPCStarts } from '../globals/Map.js'
import MuseumMapData, { MuseumPosition } from '../globals/MuseumMap.js'
import { TileHeight, TileWidth } from '../globals/Constants.js'
import { TileSet } from '../globals/Images.js'
import EntityTypes, { Player1, Player2 } from '../globals/EntityTypes.js'
import { Sand, TileNames, WetSand } from '../globals/Tiles.js'

export default class MapManager {
  constructor (config) {
    Object.assign(this, config)
    this.tileImage = null
    this.tilesPerRow = null

    this.mapCanvas = null
    this.mapCtx = null
    this.mapData = MapData

    this.worldDimensions = {
      pixels: {
        width: this.mapData[0].length * TileWidth,
        height: this.mapData.length * TileHeight
      },
      tiles: {
        width: this.mapData[0].length,
        height: this.mapData.length
      }
    }

    this.museumCanvas = null
    this.museumCtx = null
    this.museumData = MuseumMapData

    this.museumDimensions = {
      pixels: {
        width: this.museumData[0].length * TileWidth,
        height: this.museumData.length * TileHeight
      },
      tiles: {
        width: this.museumData[0].length,
        height: this.museumData.length
      }
    }
  }

  start (modifiedTiles) {
    this.tileImage = this.imageManager.getImageWithSrc(TileSet)
    this.tilesPerRow = this.tileImage.width / TileWidth

    this.mapCanvas = document.createElement('canvas')
    this.mapCtx = this.mapCanvas.getContext('2d')

    this.mapCanvas.width = this.mapData[0].length * TileWidth
    this.mapCanvas.height = this.mapData.length * TileHeight

    for (let y = 0; y < this.mapData.length; y++) {
      for (let x = 0; x < this.mapData[y].length; x++) {
        const mapData = this.mapData[y][x]
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

    this.museumCanvas = document.createElement('canvas')
    this.museumCtx = this.museumCanvas.getContext('2d')
    this.museumCanvas.width = 2 * this.museumData[0].length * TileWidth
    this.museumCanvas.height = 2 * this.museumData.length * TileHeight

    for (let y = 0; y < this.museumData.length; y++) {
      for (let x = 0; x < this.museumData[y].length; x++) {
        const museumData = this.museumData[y][x]
        const imageX = (museumData % this.tilesPerRow) * TileWidth
        const imageY = (Math.floor(museumData / this.tilesPerRow)) * TileHeight
        this.museumCtx.drawImage(
          this.tileImage,
          imageX, imageY, TileWidth, TileHeight,
          x * TileWidth, y * TileHeight, TileWidth, TileHeight
        )
      }
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

  getNPCStart (npcType) {
    switch (npcType) {
      case EntityTypes.Blacksmith:
        return NPCStarts.Blacksmith
      case EntityTypes.Carpenter:
        return NPCStarts.Carpenter
      case EntityTypes.Fisherman:
        return NPCStarts.Fisherman
      case EntityTypes.Grandma:
        return NPCStarts.Grandma
      case EntityTypes.Lumberjack:
        return NPCStarts.Lumberjack
      case EntityTypes.Tiffany:
        return NPCStarts.Tiffany
      default:
        return { x: 10, y: 10 }
    }
  }

  drawMap (mapToDraw) {
    let canvasToDraw = null
    let position = null
    switch (mapToDraw) {
      case 'museum':
        canvasToDraw = this.museumCanvas
        position = MuseumPosition
        break
      default:
        canvasToDraw = this.mapCanvas
        position = mapPosition
        break
    }

    this.imageManager.drawGround(canvasToDraw, position.x, position.y, canvasToDraw.width, canvasToDraw.height)
  }

  updateTileAtXY (x, y, tileIndex) {
    const imageX = (tileIndex % this.tilesPerRow) * TileWidth
    const imageY = (Math.floor(tileIndex / this.tilesPerRow)) * TileHeight
    this.mapCtx.drawImage(
      this.tileImage,
      imageX, imageY, TileWidth, TileHeight,
      x * TileWidth, y * TileHeight, TileWidth, TileHeight
    )
    this.mapData[y][x] = tileIndex
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

  getTileAtXY (x, y, map = this.mapData) {
    try {
      return map[y][x]      
    } catch (error) {
      console.error('Error getting tile at x, y:', x, y)
    }
  }

  getTileAtPixelPos (x, y, map = this.mapData) {
    const tileX = Math.floor(x / TileWidth)
    const tileY = Math.floor(y / TileHeight)
    return this.getTileAtXY(tileX, tileY, map)
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

  getTileColRowAtPixelPos (x, y) {
    const tileX = Math.floor(x / TileWidth)
    const tileY = Math.floor(y / TileHeight)
    return {
      col: tileX,
      row: tileY
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
