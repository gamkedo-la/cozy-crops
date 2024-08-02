export default class FontManager {
  constructor (config) {
  }
  
  loadFont (name, url) {
    const font = new FontFace(name, `url(${url})`)
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont)
    })
  }
}