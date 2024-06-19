import EventEmitter from './EventEmitter.js'

export default class Keyboard extends EventEmitter
{
    constructor()
    {
        super()

        this.keyState = {}
        this.direction = "up"
        this.init()

    }

    init()
    {
        window.addEventListener('keydown', (event) =>
        {
            this.keyState[event.key] = true

            this.updateDirection()
            this.trigger('keydown', [this.direction])
        })

        window.addEventListener('keyup', (event) =>
        {
            this.keyState[event.key] = false
            this.updateDirection()
            this.trigger('keyup', [this.direction])
        })
    }

    updateDirection()
    {
        if (this.keyState.ArrowUp || this.keyState.w) this.direction = "up"
        if (this.keyState.ArrowDown || this.keyState.s) this.direction = "down"
        if (this.keyState.ArrowRight || this.keyState.d) this.direction = "right"
        if (this.keyState.ArrowLeft || this.keyState.a) this.direction = "left"
    }

}