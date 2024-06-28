import { Vector3 } from 'three'
import Experience from '../Experience.js'
import BouncingBall from './1/BouncingBall.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Sky from './Sky.js'
import Ball from './Ball.js'
import Particles from './Particles.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.gravity = -9.82*3

        this.worldRadius = 12

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor(this.worldRadius)
            this.sky = new Sky(this.worldRadius)

            this.bouncingRedBall = new BouncingBall(0.2, new Vector3(-5,0,-5), 'red', this.floor.grassMesh)
            this.bouncingBlueBall = new BouncingBall(0.2, new Vector3(-5,0,-5), 'blue', this.floor.grassMesh)
            this.bouncingBlueBall.bounceHeight = 2
            this.bouncingBlueBall.bounce = 4
            this.bouncingBlueBall.start = Math.PI * 0.2
            
            this.bouncingOrangeBall = new BouncingBall(0.2, new Vector3(-6,0,-6), 'orange', this.floor.grassMesh)
            this.bouncingOrangeBall.bounceHeight = 1
            this.bouncingOrangeBall.speed = 5
            this.bouncingOrangeBall.start = Math.PI
            this.bouncingOrangeBall.orbitRadius = 0.5

            this.limeBall = new Ball(0.4, new Vector3(-5,0,-7), 'lime')
            this.limeBall.setBakedShadow()


            this.fox = new Fox()
            this.environment = new Environment()
            
            this.fox.setLight(this.environment)

            this.particles = new Particles(this.worldRadius)
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

    }
}