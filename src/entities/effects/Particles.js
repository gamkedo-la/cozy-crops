// simple particle effects

import { ParticleSprite } from "../../globals/Images.js"

export default class Particles {

    constructor (config) {
        Object.assign(this, config)
        this.age = 0
        this.img = this.imageManager.getImageWithSrc(ParticleSprite)
        this.sprW = 32
        this.sprH = 32
        this.drag = 0.94
        this.gravity = -0.01
        this.pool = []
    }

    add (x, y, life=1000, size=32, rotSpd=0, angle=0, velX=0, velY=0, alpha=1, drag=0.94) {
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
        }
    }

    update (deltaTime) {
        this.age += deltaTime // in ms (1000 per second)

        // for debug purposes only, spawn particles in predefined hardcoded locations
        // (eventually there will be an emitter entity class with x,y,loop etc)
        // 1200,1200 is near the player start pos
        this.splash(1200,1200)

        //console.log("particles update:"+" age:"+this.age.toFixed(0))
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
        //console.log("particles draw:"+" age:"+this.age.toFixed(0))
        //let ctx = this.imageManager.internalCtx; // nothing visible... perhaps already used this frame and about to be cleared
        let ctx = this.game.ctx 
        ctx.save()

        // FIXME: these all seem to scroll at the wrong speed
        //let offset = {x:0,y:0}
        //let offset = this.imageManager.camera.getTopLeft()
        //let offset = {x:this.scene.camera.x,y:this.scene.camera.y}
        let offset = this.scene.camera.getTopLeft()

        ctx.translate(-offset.x,-offset.y) 

        for (let p of this.pool) {
            if (!p.inactive) {
                ctx.save()
                ctx.translate(p.x, p.y)
                //ctx.translate(p.x-offset.x, p.y-offset.y)
                if (p.angle !== undefined) ctx.rotate(p.angle)
                if (p.alpha !== undefined) ctx.globalAlpha = p.alpha
                ctx.drawImage(p.sprite, -p.sprite.width / 2, -p.sprite.height / 2)
                ctx.restore()
            }
        }

        ctx.globalAlpha = 1
        ctx.restore()
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
        let num = randomInt(4,8) 
        for (let i = 0; i < num; i++) {
            let life = randomInt(333,777)
            let size = randomInt(1,4)
            let rotspd = Math.random()*0.3-0.15
            let ang = 0
            let velx = Math.random()*3-1.5
            let vely = Math.random()*-1.5
            let alpha = 0.25 // start out quite faint
            let px = Math.round(x+Math.random()*64-32)
            let py = Math.round(y+Math.random()*4-2)
            this.add(px,py,life,size,rotspd,ang,velx,vely,alpha)
        }
    }

} // end of Particles class

// helper function (inclusive: eg 1,10 may include 1 or 10)
function randomInt(min,max) { return Math.floor(Math.random()*(max-min+1))+min }

// return one item from an array
function randomChoice(choices) { return choices[randomInt(0, choices.length-1)]}
