import Keyboard from '../../Utils/Keyboard'

export default class Movable
{
    constructor()
    {
        // model
        this.model = null

        // Movement
        this.moveSpeed = 0.1
        this.moving = false

        // Rotations
        this.rotateSpeed = 0.05
        this.isRotate = true
        this.angle = 0
        this.tolerance = 0.1

        // Keyboard Input
        this.keyboard = new Keyboard()
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false
        }
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
    
    /**
     * Movement
     */
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

        // 유한 맵일 때는 제약 조건 추가
        console.log(this.direction)
        console.log(this.angle)

        this.rotate()
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
        this.rotate()

    }

    /**
     * Rotation
     */
    setAngle()
    {
        this.angle = Math.abs((this.model.rotation.y + Math.PI) % (2 * Math.PI))
    }
    
    isClockwise()
    {
        this.setAngle()
        // this.setAngle()
        switch(this.direction)
        {
            case "up":
                return 0 <= this.angle && this.angle < Math.PI
    
            case "down":
                return !(0 <= this.angle && this.angle < Math.PI)
    
            case "right":
                return this.angle <= 0.5 * Math.PI || this.angle > 1.5 * Math.PI
    
            case "left":
                return !(this.angle <= 0.5 * Math.PI || this.angle > 1.5 * Math.PI)
    
            case "up-left":
                return 0.25 * Math.PI <= this.angle && this.angle < 1.25 * Math.PI
    
            case "down-right":
                return !(0.25 * Math.PI <= this.angle && this.angle < 1.25 * Math.PI)

            case "down-left":
                return 0.75 * Math.PI <= this.angle && this.angle < 1.75 * Math.PI

            case "up-right":
                return !(0.75 * Math.PI <= this.angle && this.angle < 1.75 * Math.PI)
    
            default:
                return false // 기본적으로 false 반환
        }
    }

    hasDirection()
    {
        this.setAngle()

        switch(this.direction)
        {
            case "up":
                if(this.angle <= this.tolerance || this.angle > Math.PI * 2 - this.tolerance)
                {
                    this.setDirection()
                    return true
                }
                return false
                
            case "down":
                if(Math.PI - this.tolerance <= this.angle && this.angle < Math.PI + this.tolerance)
                {
                    this.setDirection()
                    return true
                }
                return false

    
            case "right":
                if(1.5 * Math.PI - this.tolerance <= this.angle && this.angle < 1.5 * Math.PI + this.tolerance)
                {
                    this.setDirection()
                    return true
                }
                return false

    
            case "left":
                if(0.5 * Math.PI - this.tolerance <= this.angle && this.angle < 0.5 * Math.PI + this.tolerance)
                {
                    this.setDirection()
                    return true
                }
                return false

    
            case "up-left":
                if(0.25 * Math.PI - this.tolerance <= this.angle && this.angle < 0.25 * Math.PI + this.tolerance)
                {
                    this.setDirection()
                    return true
                }
                return false

    
            case "down-right":
                if(1.25 * Math.PI - this.tolerance <= this.angle && this.angle < 1.25 * Math.PI + this.tolerance)
                {
                    this.setDirection()
                    return true
                }
                return false


            case "up-right":
                if(1.75 * Math.PI - this.tolerance <= this.angle && this.angle < 1.75 * Math.PI + this.tolerance)
                {
                    this.setDirection()
                    return true
                }
                return false

    
            case "down-left":
                if(0.75 * Math.PI - this.tolerance <= this.angle && this.angle < 0.75 * Math.PI + this.tolerance)
                {
                    this.setDirection()
                    return true
                }
                return false

    
            default:
                return false // 기본적으로 false 반환
        }
    }

    setDirection()
    {
        switch(this.direction)
        {
            case "up":
                this.angle = 0
                break
                
            case "down":
                this.angle = Math.PI
                break
    
            case "right":
                this.angle = 1.5 * Math.PI
                break
    
            case "left":
                this.angle = 0.5 * Math.PI
                break
    
            case "up-left":
                this.angle = 0.25 * Math.PI
                break
    
            case "down-right":
                this.angle = 1.25 * Math.PI
                break

            case "up-right":
                this.angle = 1.75 * Math.PI
                break
    
            case "down-left":
                this.angle = 0.75 * Math.PI
                break
        }
    }

    rotate()
    {
        this.setAngle()

        if(this.hasDirection()) return

        if(this.isClockwise()) this.model.rotation.y -= this.rotateSpeed
        else this.model.rotation.y += this.rotateSpeed
    }



}