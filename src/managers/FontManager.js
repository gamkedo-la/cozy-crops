import Events from '../globals/Events.js'
import { FontFamilies, StyleConfigs } from '../globals/Fonts.js'

export default class FontManager {
  constructor (config) {
    Object.assign(this, config)

    for (const config of StyleConfigs) {
      const element = document.createElement('style')
      document.head.appendChild(element)
      const sheet = element.sheet  
      const styles = config
      sheet.insertRule(styles, 0)
    }

    this.loadedCount = 0
    this.totalCount = Object.keys(FontFamilies).length
  }

  async load () {
    return new Promise((resolve, reject) => {
      WebFont.load({
        custom: {
          // families: [FontFamilies.MedievalSharpRegular, FontFamilies.TangerineRegular, FontFamilies.TangerineBold]
          families: Object.values(FontFamilies)
        },
        active: () => {
          this.loadedCount = this.totalCount
          this.eventManager.emit(Events.FontLoaded)
          this.eventManager.emit(Events.AllFontsLoaded)
          resolve()
        },
        inactive: reject
      })
    })
  }
}