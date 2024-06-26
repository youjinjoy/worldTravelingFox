import Experience from '../Experience.js'
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
            this.sky = new Sky()
            this.fox = new Fox()
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.fox)
            this.fox.update()
    }
}