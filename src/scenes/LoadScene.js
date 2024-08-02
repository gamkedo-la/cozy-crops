import { FontFamilies, StyleConfigs } from '../globals/Fonts.js'

export default class LoadScene {
  constructor (config) {
    this.game = config.game
    this.imageManager = config.imageManager
    this.audioManager = config.audioManager

    for (const config of StyleConfigs) {
      const element = document.createElement('style')
      document.head.appendChild(element)
      const sheet = element.sheet  
      const styles = config
      sheet.insertRule(styles, 0)
    }
  }

  async load () {
    const loadingPromises = [
      this.imageManager.load(),
      this.audioManager.load(),
      new Promise((resolve, reject) => {
        WebFont.load({
          custom: {
            families: [FontFamilies.MedievalSharpRegular, FontFamilies.TangerineRegular, FontFamilies.TangerineBold]
          },
          active: resolve,
          inactive: reject
        })
      })
    ]

    await Promise.all(loadingPromises)
  }
}