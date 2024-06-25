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
            this.updateDirection(event.code)
            this.keyState[this.direction] = true
            this.trigger('keydown', [this.direction])
        })

        window.addEventListener('keyup', (event) =>
        {
            this.updateDirection(event.code)
            this.keyState[this.direction] = false
            this.trigger('keyup', [this.direction])
        })
    }

    updateDirection(key)
    {
        this.direction = null
        if (key === 'ArrowUp' || key === 'KeyW') this.direction = "up"
        if (key === 'ArrowDown' || key === 'KeyS') this.direction = "down"
        if (key === 'ArrowRight' || key === 'KeyD') this.direction = "right"
        if (key === 'ArrowLeft' || key === 'KeyA') this.direction = "left"
        if (key === 'ShiftLeft') this.direction = "shift"
        if (key === 'Space') this.direction = "space"
    }

    destroy()
    {
        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('keyup', this.onKeyUp)
    }

}