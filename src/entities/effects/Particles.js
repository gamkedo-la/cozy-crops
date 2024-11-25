// simple particle effects

import { ParticleSprite } from "../../globals/Images.js"

export default class Particles {

  constructor (config) {
    Object.assign(this, config)
    this.age = 0
    this.img = this.imageManager.getImageWithSrc(ParticleSprite)
    this.pool = []
  }

  add (x, y, life, size, rotationSpeed, forcedAngle, velX, velY, myAlpha) {
        let p = null
        if (life === undefined) life = 1000
        if (size === undefined) size = 32
        if (velX === undefined) velX = 0
        if (velY === undefined) velY = 0
        if (myAlpha === undefined) myAlpha = 1
        if (rotationSpeed === undefined) rotationSpeed = Math.random() * 3 - 2
        if (forcedAngle === undefined) forcedAngle = 0
        for (let pnum = 0; pnum < this.pool.length; pnum++) {
            p = this.pool[pnum]
            if (p && p.inactive) { break; } // found one we can reuse
        }
        if (!p || !p.inactive) { // we need a new one
            var newParticle = { inactive: true }
            particle.push(newParticle)
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
            p.angle = forcedAngle
            p.alpha = myAlpha
            p.maxalpha = myAlpha
            p.rotSpd = rotationSpeed
            p.velX = velX
            p.velY = velY
        }
  }

  update (deltaTime) {
    this.age += deltaTime // in ms (1000 per second)
    //console.log("particles update:"+" age:"+this.age.toFixed(0))
    this.pool.forEach(
        function (p) {
            if (!p.inactive) {
                p.age = this.age - p.birth
                var lifePercent = (p.age / p.life)
                if (lifePercent > 1) lifePercent = 1
                if (lifePercent < 0) lifePercent = 0
                p.x += p.velX // move
                p.y += p.velY
                p.velX *= 0.94 // slow down
                p.velY *= 0.94
                p.scale = p.size * lifePercent // grow
                p.alpha = (1 - lifePercent) * p.maxalpha // fade
                p.angle = Math.PI * 2 * lifePercent * p.rotSpd
                if (this.age >= p.death) p.inactive = true
            }
        })
    }

    draw (offsetx=0,offsety=0) {
        //console.log("particles draw:"+" age:"+this.age.toFixed(0))
        this.game.ctx.save()
        this.game.ctx.translate(offsetx,offsety)
        this.pool.forEach(
            function (p) {
                if (!p.inactive) {
					this.game.ctx.save()
					this.game.ctx.translate(p.x, p.y)
					if (p.angle !== undefined) this.game.ctx.rotate(p.angle)
					if (p.alpha !== undefined) this.game.ctx.globalAlpha = p.alpha
					this.game.ctx.drawImage(p.sprite, -p.sprite.width / 2, -p.sprite.height / 2)
					this.game.ctx.restore()
                }
            }
        )
        this.game.ctx.restore()
    }

    // immediately clears all particles
    clear () { this.pool = [] }
}

// helper function (inclusive: eg 1,10 may include 1 or 10)
function randomInt(min,max) { return Math.floor(Math.random()*(max-min+1))+min }

// return one item from an array
function randomChoice(choices) { return choices[randomInt(0, choices.length-1)]}
