import EventEmitter from './EventEmitter.js'

export default class Keyboard extends EventEmitter
{
    constructor()
    {
        super()

        this.keyState = {}
        this.direction = null
        this.init()

    }

    init()
    {
        window.addEventListener('keydown', (event) =>
        {
            this.updateDirection(event.key)
            this.keyState[this.direction] = true
            this.trigger('keydown', [this.direction])
        })

        window.addEventListener('keyup', (event) =>
        {
            this.updateDirection(event.key)
            this.keyState[this.direction] = false
            this.trigger('keyup', [this.direction])
        })
    }

    updateDirection(key)
    {
        this.direction = null
        if (key === 'ArrowUp' || key === 'w') this.direction = "up"
        if (key === 'ArrowDown' || key === 's') this.direction = "down"
        if (key === 'ArrowRight' || key === 'd') this.direction = "right"
        if (key === 'ArrowLeft' || key === 'a') this.direction = "left"
    }

}