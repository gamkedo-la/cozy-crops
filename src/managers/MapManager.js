import MapData from '../globals/Map.js'
import { TileHeight, TileWidth } from '../globals/Constants.js'
import { TileSet } from '../globals/Images.js'

export default class MapManager {
  constructor (config) {
    Object.assign(this, config)
    this.tileImage = null
    this.tilesPerRow = null
    this.mapCanvas = null
    this.mapCtx = null
  }

  start () {
    this.tileImage = this.imageManager.getImage('TileSet')
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

  drawMap () {
    this.imageManager.draw(this.mapCanvas, 0, 0, this.mapCanvas.width, this.mapCanvas.height)
  }
}
