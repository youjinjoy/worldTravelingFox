import Keyboard from '../../Utils/Keyboard'

export default class Movable
{
    constructor()
    {
        this.keyboard = new Keyboard()
        this.keyboard.on('keydown', (direction) =>
        {
            console.log(direction)
        })
        
        this.moveSpeed = 0.1
        this.moving = false

        this.rotateSpeed = 0.1
        this.isRotate = true
        this.angle = 0
    }
}