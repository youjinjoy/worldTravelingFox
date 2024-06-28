import { Vector3 } from 'three'
import Experience from '../Experience.js'
import BouncingBall from './1/BouncingBall.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Sky from './Sky.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.gravity = -9.82*3

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.bouncingRedBall = new BouncingBall(0.2, new Vector3(-5,0,-5), 'red', this.floor.grassMesh)
            this.bouncingBlueBall = new BouncingBall(0.2, new Vector3(-5,0,-5), 'blue', this.floor.grassMesh)
            this.bouncingBlueBall.bounceHeight = 2
            this.bouncingBlueBall.bounce = 4
            this.bouncingBlueBall.start = Math.PI * 0.2

            this.sky = new Sky()
            this.fox = new Fox()
            this.environment = new Environment()
            
            this.fox.setLight(this.environment)
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

        if(this.bouncingRedBall && this.bouncingBlueBall)
        {
            this.bouncingRedBall.updateCircularMotion()
            this.bouncingBlueBall.updateVerticalMotion()
        }

    }
}