// simple particle effects
import { TileWidth, TileHeight } from "../../globals/Constants.js"
import { ParticleSprite } from "../../globals/Images.js"

export default class Particles {

    constructor (config) {
        Object.assign(this, config)
        this.age = 0
        this.img = this.imageManager.getImageWithSrc(ParticleSprite)
        this.sprW = 16
        this.sprH = 16
        this.drag = 0.94
        this.gravity = -0.01
        this.pool = []
    }

    // add a single particle to this system
    add (x, y, life=1000, size=16, rotSpd=0, angle=0, velX=0, velY=0, alpha=1, drag=0.94, gravity=0, red=255, green=255, blue=255) {
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
            
            this.imageManager.draw(p.sprite, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size, 0, 0, this.scene.camera, false, p.alpha) // alpha has no effect here, it is set above

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
            let alpha = 0.5
            this.add(x,y,life,size,rotspd,ang,velx,vely,alpha)
        }
    }

    splash(x,y) {
        let num = randomInt(2,4)
        for (let i = 0; i < num; i++) {
            let life = randomInt(100, 200)
            let size = 16
            let rotspd = Math.random()*0.3-0.15
            let ang = 0
            let velx = Math.random()*3-1.5
            let vely = Math.random()*-1.5
            let alpha = 0.1 
            let px = x + (Math.random() * TileWidth)
            let py = y + TileHeight + (Math.random() * 4) - 2 
            this.add(px,py,life,size,rotspd,ang,velx,vely,alpha)
        }
    }

    // a single little puff particle
    dust(x,y) {
        let num = randomInt(1,2)
        for (let i = 0; i < num; i++) {
            let life = 1000
            let size = 16
            let rotspd = Math.random()*0.1-0.05
            let ang = 0
            let velx = Math.random()*4-2
            let vely = Math.random()*1-0.5
            let alpha = 0.04
            let drag = 0.94
            this.add(x,y,life,size,rotspd,ang,velx,vely,alpha,drag)
        }
    }

    // a poof when a bunny lands
    landingPoof(x,y) {
        let num = randomInt(3,6)
        for (let i = 0; i < num; i++) {
            let life = randomInt(1000,2000)
            let size = 16
            let rotspd = Math.random()*0.1-0.05
            let ang = 0
            let velx = Math.random()*2-1
            let vely = Math.random()*-1
            let alpha = 0.15
            let drag = 0.9
            this.add(x,y,life,size,rotspd,ang,velx,vely,alpha,drag)
        }
    }

    // dirt particles when you harvest a plant
    harvest(x,y) {
        let num = randomInt(3,6)
        for (let i = 0; i < num; i++) {
            let life = randomInt(1000,2000)
            let size = 16
            let rotspd = Math.random()*0.1-0.05
            let ang = 0
            let velx = Math.random()*2-1
            let vely = Math.random()*-1
            let alpha = 0.15
            let drag = 0.9
            this.add(x,y,life,size,rotspd,ang,velx,vely,alpha,drag)
        }
    }

    // water droplets when you water a terrain tile
    waterGround(x,y) {
        let num = randomInt(3,6)
        for (let i = 0; i < num; i++) {
            let life = randomInt(1000,2000)
            let size = 16
            let rotspd = Math.random()*0.1-0.05
            let ang = 0
            let velx = Math.random()*2-1
            let vely = Math.random()*-1
            let alpha = 0.15
            let drag = 0.9
            this.add(x,y,life,size,rotspd,ang,velx,vely,alpha,drag)
        }
    }

} // end of Particles class

// helper function (inclusive: eg 1,10 may include 1 or 10)
function randomInt(min,max) { return Math.floor(Math.random()*(max-min+1))+min }

// return one item from an array
function randomChoice(choices) { return choices[randomInt(0, choices.length-1)]}
