import Keyboard from '../../Utils/Keyboard'

export default class Movable
{
    constructor(model)
    {
        this.model = model
        this.keyboard = new Keyboard()

        this.keyboard.on('keydown', (direction) =>
        {
            this.direction = direction
        })

        // this.keyboard.on('keyup', (direction) =>
        // {     
        // })

        this.moveSpeed = 0.1
        this.moving = false

        this.rotateSpeed = 0.1
        this.isRotate = true
        this.angle = 0
    }

    move()
    {
        console.log(this.keyboard.keyState)
        // if (this.direction == null) return
        if (this.direction === "up") this.model.position.z -= this.moveSpeed
        if (this.direction === "down") this.model.position.z += this.moveSpeed
        if (this.direction === "left") this.model.position.x -= this.moveSpeed
        if (this.direction === "right") this.model.position.x += this.moveSpeed
    }

    getAngle()
    {

    }

}