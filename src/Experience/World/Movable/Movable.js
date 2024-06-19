import Keyboard from '../../Utils/Keyboard'

export default class Movable
{
    constructor(model)
    {
        this.model = model
        this.keyboard = new Keyboard()

        this.keyboard.on('keydown', (direction) =>
        {
            this.move(direction)
            this.moving = true
        })

        this.keyboard.on('keyup', (direction) =>
        {
            this.moving = false
        })

        this.moveSpeed = 0.1
        this.moving = false

        this.rotateSpeed = 0.1
        this.isRotate = true
        this.angle = 0
    }

    move(direction)
    {
        switch(direction){
            case "up":
                this.model.position.z -= this.moveSpeed
                break
            case "down":
                this.model.position.z += this.moveSpeed
                break
            case "left":
                this.model.position.x -= this.moveSpeed
                break
            case "right":
                this.model.position.x += this.moveSpeed
                break
        }
    }

}