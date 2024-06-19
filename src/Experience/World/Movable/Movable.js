import Keyboard from '../../Utils/Keyboard'

export default class Movable
{
    constructor(model)
    {
        this.model = model
        console.log("!",this.model)
        this.keyboard = new Keyboard()

        // this.keyboard.on('keydown', (direction) =>
        // {
        //     console.log(direction)
        // })

        this.moveSpeed = 0.1
        this.moving = false

        this.rotateSpeed = 0.1
        this.isRotate = true
        this.angle = 0
    }

    move()
    {

    }
}