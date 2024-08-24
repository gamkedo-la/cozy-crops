import MapData, { Player1Start, Player2Start } from '../globals/Map.js'
import { TileHeight, TileWidth } from '../globals/Constants.js'
import { TileSet } from '../globals/Images.js'
import { Player1, Player2 } from '../globals/EntityTypes.js'

export default class MapManager {
  constructor (config) {
    Object.assign(this, config)
    this.tileImage = null
    this.tilesPerRow = null
    this.mapCanvas = null
    this.mapCtx = null
  }

  start () {
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
    const tileX = Math.floor(x / TileWidth)
    const tileY = Math.floor(y / TileHeight)
    this.updateTileAtXY(tileX, tileY, tileIndex)
  }

  getTileAtXY (x, y) {
    return MapData[y][x]
  }

  getTileAtPixelPos (x, y) {
    const tileX = Math.floor(x / TileWidth)
    const tileY = Math.floor(y / TileHeight)
    return this.getTileAtXY(tileX, tileY)
  }
}
