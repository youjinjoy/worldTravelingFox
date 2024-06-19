import Keyboard from '../../Utils/Keyboard'

export default class Movable
{
    constructor(model)
    {
        this.model = model
        this.keyboard = new Keyboard()
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false
        }

        this.moveSpeed = 0.1
        this.moving = false

        this.rotateSpeed = 0.1
        this.isRotate = true
        this.angle = 0

        this.initKeyboard()
    }
    
    initKeyboard()
    {
        this.keyboard.on('keydown', (direction) =>
        {
            this.keys[direction] = true
            this.updateDirection()
        })

        this.keyboard.on('keyup', (direction) =>
        {     
            this.keys[direction] = false
            this.updateDirection()
        })
    }
    
    updateDirection()
    {
        if (this.keys.up && this.keys.left) this.direction = "up-left"
        else if (this.keys.up && this.keys.right) this.direction = "up-right"
        else if (this.keys.down && this.keys.left) this.direction = "down-left"
        else if (this.keys.down && this.keys.right) this.direction = "down-right"
        else if (this.keys.up) this.direction = "up"
        else if (this.keys.down) this.direction = "down"
        else if (this.keys.left) this.direction = "left"
        else if (this.keys.right) this.direction = "right"
        else this.direction = null
    }

    move()
    {
        switch (this.direction) {
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
            case "up-left":
                this.model.position.z -= this.moveSpeed * Math.sqrt(0.5)
                this.model.position.x -= this.moveSpeed * Math.sqrt(0.5)
                break
            case "up-right":
                this.model.position.z -= this.moveSpeed * Math.sqrt(0.5)
                this.model.position.x += this.moveSpeed * Math.sqrt(0.5)
                break
            case "down-left":
                this.model.position.z += this.moveSpeed * Math.sqrt(0.5)
                this.model.position.x -= this.moveSpeed * Math.sqrt(0.5)
                break
            case "down-right":
                this.model.position.z += this.moveSpeed * Math.sqrt(0.5)
                this.model.position.x += this.moveSpeed * Math.sqrt(0.5)
                break
        }
    }

    getAngle()
    {
        console.log(this.model.rotation.y+Math.PI*0.5)
    }

}