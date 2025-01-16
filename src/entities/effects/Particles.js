// simple particle effects
import { TileWidth, TileHeight } from "../../globals/Constants.js"
import { ParticleSprite } from "../../globals/Images.js"

export default class Particles {

    constructor (config) {
        Object.assign(this, config)
        this.age = 0
        this.img = this.imageManager.getImageWithSrc(ParticleSprite)
        
        // the above image split into 3 separate channels once
        // so we don't need temp canvases to tint
        this.imgR = this.imageManager.tintImage(this.img,1,0,0,1)
        this.imgG = this.imageManager.tintImage(this.img,0,1,0,1)
        this.imgB = this.imageManager.tintImage(this.img,0,0,1,1)

        this.sprW = 8
        this.sprH = 8
        this.drag = 0.94
        this.gravity = -0.01
        this.pool = []
    }

    // add a single particle to this system
    add (x, y, life=1000, size=8, rotSpd=0, angle=0, velX=0, velY=0, alpha=1, drag=0.94, gravity=0, red=1, green=1, blue=1) {
        
        size = 2 // dumb hack
        
        let p = null
        for (let pnum = 0; pnum < this.pool.length; pnum++) {
            p = this.pool[pnum]
            if (p && p.inactive) { break; } // found one we can reuse
        }
        if (!p || !p.inactive) { // we need a new one
            var newParticle = { inactive: true }
            this.pool.push(newParticle)
            p = newParticle
        }
        if (p && p.inactive) { // reuse an old one
            p.x = x
            p.y = y
            p.inactive = false
            p.sprite = this.img
            p.size = size
            p.life = life
            p.birth = this.age
            p.death = p.birth + life
            p.angle = angle
            p.alpha = alpha
            p.maxalpha = alpha
            p.rotSpd = rotSpd
            p.velX = velX
            p.velY = velY
            p.drag = drag
            p.gravity = gravity
            p.red = red
            p.green = green
            p.blue = blue
        }
    }

    update (deltaTime) {
        this.age += deltaTime // in ms (1000 per second)
        for (let p of this.pool) {
            if (!p.inactive) {
                p.age = this.age - p.birth
                let lifePercent = (p.age / p.life)
                if (lifePercent > 1) lifePercent = 1
                if (lifePercent < 0) lifePercent = 0
                p.x += p.velX // move
                p.y += p.velY
                p.velX *= p.drag // slow down
                p.velY *= p.drag
                p.scale = p.size * lifePercent // grow
                p.alpha = (1 - lifePercent) * p.maxalpha // fade
                p.angle = Math.PI * 2 * lifePercent * p.rotSpd
                if (this.age >= p.death) p.inactive = true
            }
        }
    }

    draw () {
        // Don't draw to the Game Canvas, tell the Image Manager to draw for you, things go way better that way.
        this.imageManager.internalCtx.save()
        for (const p of this.pool) {
            this.imageManager.internalCtx.globalAlpha = p.alpha
            
            // size (scale) unsupported by engine?
            // this.imageManager.internalCtx.scale(2,2)  // test - not supported? need to scale LAST
            
            // rotation unsupported by engine?
            // this.imageManager.internalCtx.rotate(p.angle); // cannot rotate before translation
            
            // works: the entire rgba sprite - not tintable
            // this.imageManager.draw(p.sprite, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size, 0, 0, this.scene.camera, false, p.alpha) // alpha has no effect here, it is set above

            // each color is drawn additively - new temp canvas required for sprite tinting this way
            this.imageManager.internalCtx.globalCompositeOperation = "lighter" // additive
            this.imageManager.internalCtx.globalAlpha = p.alpha * p.red
            this.imageManager.draw(this.imgR, Math.round(p.x - p.size / 2), Math.round(p.y - p.size / 2), p.size, p.size, 0, 0, this.scene.camera, false, p.alpha)
            this.imageManager.internalCtx.globalAlpha = p.alpha * p.green
            this.imageManager.draw(this.imgG, Math.round(p.x - p.size / 2), Math.round(p.y - p.size / 2), p.size, p.size, 0, 0, this.scene.camera, false, p.alpha)
            this.imageManager.internalCtx.globalAlpha = p.alpha * p.blue
            this.imageManager.draw(this.imgB, Math.round(p.x - p.size / 2), Math.round(p.y - p.size / 2), p.size, p.size, 0, 0, this.scene.camera, false, p.alpha)
            this.imageManager.internalCtx.globalCompositeOperation = "source-over" // reset to normal blending

            // faster gpu tinting without having to set each pixel one at a time in a loop
            // hmmm - is this actually faster?? it slows down the game a lot!!! I was wrong
            /*
            if (!this.tintedSprite) {
                console.log("new tinted sprite canvas!")
                this.tintedSprite = document.createElement('canvas')
                this.tintedSprite.width = p.sprite.width
                this.tintedSprite.height = p.sprite.height
                this.tintedCTX = this.tintedSprite.getContext("2d")
            }
            this.tintedCTX.fillStyle = "#09f"
            this.tintedCTX.fillRect(0, 0, p.sprite.width, p.sprite.height)
            this.tintedCTX.globalCompositeOperation = "destination-in"
            this.tintedCTX.drawImage(p.sprite, 0, 0)
            this.imageManager.draw(this.tintedSprite, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size, 0, 0, this.scene.camera, false, p.alpha) // alpha has no effect here, it is set above
            */

        }
        this.imageManager.internalCtx.restore()
    }

    // immediately clears all particles
    clear () { this.pool = [] }

    // maybe spawn a fire particle
    fire(x,y) {
        let num = randomInt(0,1) // sometimes adds none
        for (let i = 0; i < num; i++) {
            let life = randomInt(333,777)
            let size = randomInt(1,4)
            let rotspd = Math.random()*0.3-0.15
            let ang = 0
            let velx = Math.random()*3-1.5
            let vely = Math.random()*-1.5
            let alpha = 0.75
            this.add(x,y,life,size,rotspd,ang,velx,vely,alpha)
        }
    }

    // used by many waterfalls - restraint is required
    splash(x,y) {
        // blue water falling from the top
        let num = randomInt(0,1)
        for (let i = 0; i < num; i++) {
            let life = 600
            let size = 8
            let rotspd = 0
            let ang = 0
            let velx = 0
            let vely = 0.25
            let alpha = 0.5
            let px = x + (Math.random() * TileWidth)
            let py = y+1
            let drag = 1
            let grav = 0
            // matches the blue shade on the waterfall sprite:
            let r = 68 / 256
            let g = 181 / 256
            let b = 202 / 256
            this.add(px,py,life,size,rotspd,ang,velx,vely,alpha,drag,grav,r,g,b)
        }
        // white water/mist at the bottom
        num = randomInt(0,3)
        for (let i = 0; i < num; i++) {
            let life = randomInt(200, 400)
            let size = 8
            let rotspd = Math.random()*0.3-0.15
            let ang = 0
            let velx = Math.random()*0.5-0.25
            let vely = Math.random()*-0.5
            let alpha = 0.5
            let px = x + (Math.random() * TileWidth)
            let py = y + TileHeight + (Math.random() * 4) - 3 
            this.add(px,py,life,size,rotspd,ang,velx,vely,alpha)
        }
    }

    // a single little puff particle
    dust(x,y) {
        let num = randomInt(0,1)
        for (let i = 0; i < num; i++) {
            let life = randomInt(500,1000)
            let size = 8
            let rotspd = Math.random()*0.1-0.05
            let ang = 0
            let velx = Math.random()*2-1
            let vely = Math.random()*1-0.5
            let alpha = 0.1
            let drag = 0.94
            this.add(x,y,life,size,rotspd,ang,velx,vely,alpha,drag)
        }
    }

    // a poof when a bunny lands
    landingPoof(x,y) {
        let num = randomInt(3,6)
        for (let i = 0; i < num; i++) {
            let life = randomInt(1000,2000)
            let size = 8
            let rotspd = Math.random()*0.1-0.05
            let ang = 0
            let velx = Math.random()*2-1
            let vely = Math.random()*-1
            let alpha = 0.2
            let drag = 0.9
            let gravity = 0
            let r = 1
            let g = 0.8
            let b = 0.6
            this.add(x,y,life,size,rotspd,ang,velx,vely,alpha,drag,gravity,r,g,b)
        }
    }

    // dirt particles when you harvest a plant
    harvestCropFX(x,y) {
        let num = randomInt(3,6)
        for (let i = 0; i < num; i++) {
            let life = randomInt(1000,2000)
            let size = 8
            let rotspd = Math.random()*0.1-0.05
            let ang = 0
            let velx = Math.random()*2-1
            let vely = Math.random()*-1
            let alpha = 0.25
            let drag = 0.9
            let gravity = -2
            let r = 0.2
            let g = 1
            let b = 0.3
            this.add(x,y,life,size,rotspd,ang,velx,vely,alpha,drag,gravity,r,g,b)        
        }
    }

    // a little dust when you plant a seed
    plantSeedFX(x,y) {
        let num = randomInt(3,6)
        for (let i = 0; i < num; i++) {
            let life = randomInt(1000,2000)
            let size = 8
            let rotspd = Math.random()*0.1-0.05
            let ang = 0
            let velx = Math.random()*2-1
            let vely = Math.random()*-1
            let alpha = 0.25
            let drag = 0.9
            let gravity = 1
            let r = 0
            let g = 1
            let b = 0
            this.add(x,y,life,size,rotspd,ang,velx,vely,alpha,drag,gravity,r,g,b)
        }
    }
    
    // dirt particles when you plow mud
    tillGroundFX(x,y) {
        let num = randomInt(3,6)
        for (let i = 0; i < num; i++) {
            let life = randomInt(1000,2000)
            let size = 8
            let rotspd = Math.random()*0.1-0.05
            let ang = 0
            let velx = Math.random()*2-1
            let vely = Math.random()*-1
            let alpha = 0.5
            let drag = 0.9
            let gravity = 0
            let r = 1
            let g = 0.6
            let b = 0.1
            this.add(x,y,life,size,rotspd,ang,velx,vely,alpha,drag,gravity,r,g,b)
        }
    }

    // water droplets when you water a terrain tile
    waterGroundFX(x,y) {
        let num = randomInt(3,6)
        for (let i = 0; i < num; i++) {
            let life = randomInt(1000,2000)
            let size = 8
            let rotspd = Math.random()*0.1-0.05
            let ang = 0
            let velx = Math.random()*2-1
            let vely = Math.random()*-1
            let alpha = 0.75
            let drag = 0.9
            let gravity = 2
            let r = 0
            let g = 0.2
            let b = 1
            this.add(x,y,life,size,rotspd,ang,velx,vely,alpha,drag,gravity,r,g,b)        
        }
    }

    // FIXME: nothing seems to render but I don't know why
    riverSplashes() {
        // this was done manually by clicking interesting spots of the map and recording the x,y
        const xy = [[1532,1546],[1550,1534],[1576,1544],[1588,1534],[1604,1543],[1449,1702],[1475,1718],[1692,1286],[1999,1580],[2009,1582],[2024,1574],[2033,1582],[2048,1579],];
        let size = 8
        let rotspd = 0
        let ang = 0
        let alpha = 1
        let drag = 0
        let gravity = 0
        let r = 1
        let g = 1
        let b = 1
        // SOUTH
        for (let splash of xy) {
            let life = randomInt(1000,2000)
            let velx = 0
            let vely = Math.random()*8
            //console.log("water splash at "+splash[0]+","+splash[1])
            this.add(splash[0],splash[1],life,size,rotspd,ang,velx,vely,alpha,drag,gravity,r,g,b)
        }
    }

} // end of Particles class

// helper function (inclusive: eg 1,10 may include 1 or 10)
function randomInt(min,max) { return Math.floor(Math.random()*(max-min+1))+min }

// return one item from an array
function randomChoice(choices) { return choices[randomInt(0, choices.length-1)]}
