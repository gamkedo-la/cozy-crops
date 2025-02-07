import EntityTypes from './EntityTypes.js'

const PlayerHomeMap = [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [  0,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,  0],
    [  0,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,  0],
    [  0,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,  0],
    [  0,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,  0],
    [  0,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,  0],
    [  0,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,  0],
    [  0,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,  0],
    [  0,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,  0],
    [  0,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,  0],
    [  0,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,  0],
    [  0,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,  0],
    [  0,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,  0],
    [  0,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,  0],
    [  0,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,  0],
    [  0,640,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,  0],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
  ]

// const PlayerHomeMap = [
//   [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
//   [  0,169,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,171,172,  0],
//   [  0,173,174,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,176,177,  0],
//   [  0,173,178,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,179,177,  0],
//   [  0,173,180,181,181,181,181,181,181,181,181,181,181,181,181,181,181,181,181,182,177,  0],
//   [  0,173,183,211,212,213,214,211,212,213,214,189,189,189,189,189,189,189,189,184,177,  0],
//   [  0,173,183,211,212,213,214,211,212,213,214,190,190,190,190,190,190,190,190,184,177,  0],
//   [  0,173,183,211,212,213,214,211,212,213,214,189,189,189,189,189,189,189,189,184,177,  0],
//   [  0,173,183,211,212,213,214,211,212,213,214,190,190,190,190,190,190,190,190,184,177,  0],
//   [  0,173,183,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,184,177,  0],
//   [  0,173,183,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,184,177,  0],
//   [  0,173,183,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,184,177,  0],
//   [  0,173,183,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,184,177,  0],
//   [  0,173,183,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,184,177,  0],
//   [  0,173,183,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,184,177,  0],
//   [  0,185,186,186,186,186,186,186,186,186,187,187,186,186,186,186,186,186,186,186,188,  0],
//   [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
// ]

export default PlayerHomeMap

  export function setWallpaper (type) {
    switch (type) {
      case EntityTypes.WallPaperAuburn:
        setWallpaperAuburn()
        break
      case EntityTypes.WallPaperGray:
        setWallpaperGray()
        break
      case EntityTypes.WallPaperStriped:
        setWallpaperStriped()
        break
      case EntityTypes.WallPaperTan:
        setWallpaperTan()
        break
    }
  }
  
  export const HomePosition = { x: -150, y: -100 }
  export const HomeEntrance = { x: 450 + HomePosition.x, y: 380 + HomePosition.y }
  export const HomeDialogPosition = { x: 512 + HomePosition.x, y: 340 + HomePosition.y }
  export const FurniturePositions = {
    Window1: { x: 485 + HomePosition.x, y: 236 + HomePosition.y },
    Window2: { x: 555 + HomePosition.x, y: 236 + HomePosition.y },
    SleepingBag1: { x: 583 + HomePosition.x, y: 396 + HomePosition.y },
  }

function setWallpaperAuburn () {
  for (let y = 0; y < 17; y++) {
    for (let x = 0; x < 22; x++) {
      if (y === 0 || y === 16 || x === 0 || x === 21) continue

      const tile = PlayerHomeMap[y][x]
      switch (tile) {
        case 174:
        case 275:
          PlayerHomeMap[y][x] = 243
          break
        case 175:
        case 276:
          PlayerHomeMap[y][x] = 244
          break
        case 176:
        case 277:
          PlayerHomeMap[y][x] = 245
          break
        case 178: // skip 177
        case 278:
          PlayerHomeMap[y][x] = 246
          break
        case 179:
        case 279:
          PlayerHomeMap[y][x] = 247
          break
        case 180:
        case 280:
          PlayerHomeMap[y][x] = 248
          break
        case 181:
        case 281:
          PlayerHomeMap[y][x] = 249
          break
        case 182:
        case 282:
          PlayerHomeMap[y][x] = 250
          break
        case 183:
        case 283:
          PlayerHomeMap[y][x] = 251
          break
        case 184:
        case 284:
          PlayerHomeMap[y][x] = 252
          break
      }
    }
  }
}

function setWallpaperGray () {
  for (let y = 0; y < 17; y++) {
    for (let x = 0; x < 22; x++) {
      if (y === 0 || y === 16 || x === 0 || x === 21) continue

      const tile = PlayerHomeMap[y][x]
      switch (tile) {
        case 174:
        case 243:
          PlayerHomeMap[y][x] = 275
          break
        case 175:
        case 244:
          PlayerHomeMap[y][x] = 276
          break
        case 176:
        case 245:
          PlayerHomeMap[y][x] = 277
          break
        case 178: // skip 177
        case 246:
          PlayerHomeMap[y][x] = 278
          break
        case 179:
        case 247:
          PlayerHomeMap[y][x] = 279
          break
        case 180:
        case 248:
          PlayerHomeMap[y][x] = 280
          break
        case 181:
        case 249:
          PlayerHomeMap[y][x] = 281
          break
        case 182:
        case 250:
          PlayerHomeMap[y][x] = 282
          break
        case 183:
        case 251:
          PlayerHomeMap[y][x] = 283
          break
        case 184:
        case 252:
          PlayerHomeMap[y][x] = 284
          break
      }
    }
  }
}

function setWallpaperTan () {
  for (let y = 0; y < 17; y++) {
    for (let x = 0; x < 22; x++) {
      if (y === 0 || y === 16 || x === 0 || x === 21) continue

      const tile = PlayerHomeMap[y][x]
      switch (tile) {
        case 243:
        case 275:
          PlayerHomeMap[y][x] = 174
          break
        case 244:
        case 276:
          PlayerHomeMap[y][x] = 175
          break
        case 245:
        case 277:
          PlayerHomeMap[y][x] = 176
          break
        case 246:
        case 278:
          PlayerHomeMap[y][x] = 178 // skip 177
          break
        case 247:
        case 279:
          PlayerHomeMap[y][x] = 179
          break
        case 248:
        case 280:
          PlayerHomeMap[y][x] = 180
          break
        case 249:
        case 281:
          PlayerHomeMap[y][x] = 181
          break
        case 250:
        case 282:
          PlayerHomeMap[y][x] = 182
          break
        case 251:
        case 283:
          PlayerHomeMap[y][x] = 183
          break
        case 252:
        case 284:
          PlayerHomeMap[y][x] = 184
          break
      }
    }
  }
}