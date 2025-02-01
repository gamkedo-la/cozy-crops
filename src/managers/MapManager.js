import MapData, { Player1Start, Player2Start, mapPosition, NPCStarts, BobberLocations, TreeStarts } from '../globals/Map.js'
import MuseumMapData, { MuseumPosition } from '../globals/MuseumMap.js'
import StoreMapData, { StorePosition } from '../globals/StoreMap.js'
import HomeMapData, { HomePosition } from '../globals/PlayerHomeMap.js'
import CarpenterMapData, { CarpenterPosition } from '../globals/CarpenterMap.js'
import BlacksmithMapData, { BlacksmithPosition } from '../globals/BlacksmithMap.js'
import { TileHeight, TileWidth } from '../globals/Constants.js'
import { TileSet } from '../globals/Images.js'
import EntityTypes, { Player1, Player2 } from '../globals/EntityTypes.js'
import { TileNames } from '../globals/Tiles.js'
import { NearShoreOcean, Sand, Waterfall, WetSand, isGrass, isSand } from '../globals/TilesWorld.js'

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

    this.waterfallTileXYs = null
    this.nearShoreOceanTileXYs = null

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

    this.storeCanvas = null
    this.storeCtx = null
    this.storeData = StoreMapData

    this.storeDimensions = {
      pixels: {
        width: this.storeData[0].length * TileWidth,
        height: this.storeData.length * TileHeight
      },
      tiles: {
        width: this.storeData[0].length,
        height: this.storeData.length
      }
    }

    this.homeCanvas = null
    this.homeCtx = null
    this.homeData = HomeMapData

    this.homeDimensions = {
      pixels: {
        width: this.homeData[0].length * TileWidth,
        height: this.homeData.length * TileHeight
      },
      tiles: {
        width: this.homeData[0].length,
        height: this.homeData.length
      }
    }

    this.carpenterCanvas = null
    this.carpenterCtx = null
    this.carpenterData = CarpenterMapData

    this.carpenterDimensions = {
      pixels: {
        width: this.carpenterData[0].length * TileWidth,
        height: this.carpenterData.length * TileHeight
      },
      tiles: {
        width: this.carpenterData[0].length,
        height: this.carpenterData.length
      }
    }

    this.blacksmithCanvas = null
    this.blacksmithCtx = null
    this.blacksmithData = BlacksmithMapData

    this.blacksmithDimensions = {
      pixels: {
        width: this.blacksmithData[0].length * TileWidth,
        height: this.blacksmithData.length * TileHeight
      },
      tiles: {
        width: this.blacksmithData[0].length,
        height: this.blacksmithData.length
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

    this.storeCanvas = document.createElement('canvas')
    this.storeCtx = this.storeCanvas.getContext('2d')
    this.storeCanvas.width = 2 * this.storeData[0].length * TileWidth
    this.storeCanvas.height = 2 * this.storeData.length * TileHeight

    for (let y = 0; y < this.storeData.length; y++) {
      for (let x = 0; x < this.storeData[y].length; x++) {
        const storeData = this.storeData[y][x]
        const imageX = (storeData % this.tilesPerRow) * TileWidth
        const imageY = (Math.floor(storeData / this.tilesPerRow)) * TileHeight
        this.storeCtx.drawImage(
          this.tileImage,
          imageX, imageY, TileWidth, TileHeight,
          x * TileWidth, y * TileHeight, TileWidth, TileHeight
        )
      }
    }

    this.homeCanvas = document.createElement('canvas')
    this.homeCtx = this.homeCanvas.getContext('2d')
    this.homeCanvas.width = 2 * this.homeData[0].length * TileWidth
    this.homeCanvas.height = 2 * this.homeData.length * TileHeight

    for (let y = 0; y < this.homeData.length; y++) {
      for (let x = 0; x < this.homeData[y].length; x++) {
        const homeData = this.homeData[y][x]
        const imageX = (homeData % this.tilesPerRow) * TileWidth
        const imageY = (Math.floor(homeData / this.tilesPerRow)) * TileHeight
        this.homeCtx.drawImage(
          this.tileImage,
          imageX, imageY, TileWidth, TileHeight,
          x * TileWidth, y * TileHeight, TileWidth, TileHeight
        )
      }
    }

    this.carpenterCanvas = document.createElement('canvas')
    this.carpenterCtx = this.carpenterCanvas.getContext('2d')
    this.carpenterCanvas.width = 2 * this.carpenterData[0].length * TileWidth
    this.carpenterCanvas.height = 2 * this.carpenterData.length * TileHeight

    for (let y = 0; y < this.carpenterData.length; y++) {
      for (let x = 0; x < this.carpenterData[y].length; x++) {
        const carpenterData = this.carpenterData[y][x]
        const imageX = (carpenterData % this.tilesPerRow) * TileWidth
        const imageY = (Math.floor(carpenterData / this.tilesPerRow)) * TileHeight
        this.carpenterCtx.drawImage(
          this.tileImage,
          imageX, imageY, TileWidth, TileHeight,
          x * TileWidth, y * TileHeight, TileWidth, TileHeight
        )
      }
    }

    this.blacksmithCanvas = document.createElement('canvas')
    this.blacksmithCtx = this.blacksmithCanvas.getContext('2d')
    this.blacksmithCanvas.width = 2 * this.blacksmithData[0].length * TileWidth
    this.blacksmithCanvas.height = 2 * this.blacksmithData.length * TileHeight

    for (let y = 0; y < this.blacksmithData.length; y++) {
      for (let x = 0; x < this.blacksmithData[y].length; x++) {
        const blacksmithData = this.blacksmithData[y][x]
        const imageX = (blacksmithData % this.tilesPerRow) * TileWidth
        const imageY = (Math.floor(blacksmithData / this.tilesPerRow)) * TileHeight
        this.blacksmithCtx.drawImage(
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

  waterAllSand () {
    this.mapData.forEach((row, y) => {
      row.forEach((tileIndex, x) => {
        if (tileIndex === Sand) {
          this.updateTileAtXY(x, y, WetSand)
          this.gameManager.setModifiedTile(x, y, WetSand, getTimeForTileIndex(WetSand))
        }
      })
    })
  }

  unWaterAllTiles () {
    this.gameManager.getWateredTiles().forEach(tile => {
      this.updateTileAtXY(tile.x, tile.y, Sand)
      this.gameManager.setModifiedTile(tile.x, tile.y, Sand, getTimeForTileIndex(Sand))
    })
  }

  isGrassTile (tileIndex) {
    return isGrass(tileIndex)
  }

  isSandTile (tileIndex) {
    return isSand(tileIndex)
  }

  getWaterfallTilesXY () {
    if (!this.waterfallTileXYs) {
      this.waterfallTileXYs = []
      this.mapData.forEach((row, y) => {
        row.forEach((tileIndex, x) => {
          if (tileIndex === Waterfall) {
            this.waterfallTileXYs.push({ x: x * TileWidth, y: y * TileHeight })
          }
        })
      })
    }

    return this.waterfallTileXYs
  }

  getNearShoreOceanTilesXY () {
    if (!this.nearShoreOceanTileXYs) {
      this.nearShoreOceanTileXYs = []
      this.mapData.forEach((row, y) => {
        row.forEach((tileIndex, x) => {
          if (tileIndex === NearShoreOcean) {
            this.nearShoreOceanTileXYs.push({ x: x * TileWidth, y: y * TileHeight })
          }
        })
      })
    }

    return this.nearShoreOceanTileXYs
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

  getTreeStarts () {
    return TreeStarts
  }

  getBobberLocationForDockLocation (dockLocation) {
    const bobberLocation = BobberLocations.find(location => {
      return location.dock.x <= dockLocation.x &&
      location.dock.x + TileWidth >= dockLocation.x &&
      location.dock.y <= dockLocation.y &&
      location.dock.y + TileHeight >= dockLocation.y
    })

    return (bobberLocation ? bobberLocation.bobber : null)
  }

  drawMap (mapToDraw) {
    let canvasToDraw = null
    let position = null
    switch (mapToDraw) {
      case 'museum':
        canvasToDraw = this.museumCanvas
        position = MuseumPosition
        break
      case 'store':
        canvasToDraw = this.storeCanvas
        position = StorePosition
        break
      case 'home':
        canvasToDraw = this.homeCanvas
        position = HomePosition
        break
      case 'carpenter':
        canvasToDraw = this.carpenterCanvas
        position = CarpenterPosition
        break
      case 'blacksmith':
        canvasToDraw = this.blacksmithCanvas
        position = BlacksmithPosition
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
    this.gameManager.setModifiedTile(x, y, tileIndex, getTimeForTileIndex(tileIndex))
  }

  updateTileAtPixelPos (x, y, tileIndex) {
    if (isNaN(tileIndex)) {
      tileIndex = getTileIndexByName(tileIndex)
    }
    const tileX = Math.floor(x / TileWidth)
    const tileY = Math.floor(y / TileHeight)
    this.updateTileAtXY(tileX, tileY, tileIndex)
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

  getRandomForagePos (mustBeGrowable = true) {
    let x, y, tileIsGrowable
    do {
      x = Math.floor(Math.random() * this.worldDimensions.pixels.width)
      y = Math.floor(Math.random() * this.worldDimensions.pixels.height)
      const tile = this.getTileAtPixelPos(x, y)
      if (mustBeGrowable) {
        tileIsGrowable = this.collisionManager.tileIsGrowable(tile)
        const tilePos = this.getTileTopLeftAtPixelPos(x, y)
        x = tilePos.x
        y = tilePos.y
      }
    } while (mustBeGrowable && !tileIsGrowable)

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
