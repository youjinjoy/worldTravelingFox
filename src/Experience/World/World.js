import { Vector3 } from 'three'
import Experience from '../Experience.js'
import BouncingBall from './1/BouncingBall.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Sky from './Sky.js'
import Ball from './Ball.js'
import Particles from './Particles.js'
import Galaxy from './Galaxy.js'
import Ocean from './Ocean.js'

import { overlay } from '../Loading/Loading.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.scene.add(overlay) // Loading Overlay

        this.resources = this.experience.resources
        
        this.gravity = -9.82*3

        this.worldRadius = 12

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor(this.worldRadius)
            this.sky = new Sky(this.worldRadius)

            this.bouncingRedBall = new BouncingBall(0.2, new Vector3(-5,0,-2), 'red', this.floor.grassMesh)
            this.bouncingBlueBall = new BouncingBall(0.2, new Vector3(-5,0,-2), 'blue', this.floor.grassMesh)
            this.bouncingBlueBall.bounceHeight = 2
            this.bouncingBlueBall.bounce = 4
            this.bouncingBlueBall.start = Math.PI * 0.2
            
            this.bouncingOrangeBall = new BouncingBall(0.2, new Vector3(-6,0,-2), 'orange', this.floor.grassMesh)
            this.bouncingOrangeBall.bounceHeight = 1
            this.bouncingOrangeBall.speed = 5
            this.bouncingOrangeBall.start = Math.PI
            this.bouncingOrangeBall.orbitRadius = 0.5

            this.limeBall = new Ball(0.4, new Vector3(-5,0,-4), 'lime')
            this.limeBall.setBakedShadow()


            this.fox = new Fox()
            this.environment = new Environment()
            
            this.fox.setLight(this.environment)

            this.particles = new Particles(this.worldRadius)
            this.galaxy1 = new Galaxy( {position : { x: 20, y: 2, z: -40}, colors: {inside: 0x2eff89, outside: 0x335099}})
            this.galaxy2 = new Galaxy({
                position: { x: -20, y: 6, z: -40 },
                rotation: { x: 0.8168, y: 1.2566, z: 0 },
                appearance: { size: 0.3, count: 2000, radius: 6, branches: 3, spin: -2.591 },
                randomness: { value: 0.744, power: 5.426 },
                colors: { inside: 0x76321e, outside: 0x335099 },
                animation: { speed: 0.0002, direction: -1 }
            })

            this.ocean = new Ocean(this.worldRadius)
        })
    }

    update()
    {
        if(this.fox)
        {
            this.fox.update()
        }

        if(this.environment)
        {
            if (this.fox.model) this.environment.updatePosition(this.fox.model)
            this.environment.update()
        }

        if(this.bouncingRedBall && this.bouncingBlueBall && this.bouncingOrangeBall)
        {
            this.bouncingRedBall.updateCircularMotion()
            this.bouncingBlueBall.updateVerticalMotion()
            this.bouncingOrangeBall.updateCircularMotion()
        }
        
        if(this.galaxy1 && this.galaxy2)
        {
            this.galaxy1.update()
            this.galaxy2.update()
        }

        if(this.ocean)
        {
            this.ocean.update()
        }

    }
}