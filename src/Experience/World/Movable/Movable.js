import { thickness } from 'three/examples/jsm/nodes/core/PropertyNode'
import Experience from '../../Experience'
import Keyboard from '../../Utils/Keyboard'

export default class Movable
{
    constructor()
    {
        this.experience = new Experience()
        this.gravity = this.experience.world.gravity

        // Model
        this.model = null

        // Movement
        this.moveSpeed = 0.1
        this.walking = true

        this.running = false

        this.jumpSpeed = 8
        this.jumpDuration = 0
        this.jumping = false
        this.jumpStartY = 0

        // Rotations
        this.rotateSpeed = 0.1
        this.isRotate = true
        this.angle = 0
        this.tolerance = 0.1

        // Keyboard Input
        this.keyboard = new Keyboard()
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false,
            shift: false,
            space: false
        }
        this.initKeyboard()

        // Camera
        this.camera = this.experience.camera
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

        if (this.keys.shift) this.run()

        if (this.keys.space && !this.jumping) this.jump()
    }
    
    run()
    {
        if (!this.jumping)
        {
            if (this.running)
            {
                this.running = false
                this.walking = true
                this.moveSpeed = 0.1
                this.jumpSpeed = 8
            }
            else
            {
                this.running = true
                this.walking = false
                this.moveSpeed = 0.15           
                this.jumpSpeed = 10
            }
        }
    }

    jump()
    {
        if(!this.jumping)
        {
            this.jumping = true
            this.jumpDuration = 0
            this.jumpStartY = this.model.position.y
        }
    }

    move()
    {

        // 유한 맵일 때는 제약 조건 추가
        switch (this.direction)
        {
            case "up":
                this.model.position.z -= this.moveSpeed
                this.rotate()
                break
            case "down":
                this.model.position.z += this.moveSpeed
                this.rotate()
                break
            case "left":
                this.model.position.x -= this.moveSpeed
                this.rotate()
                break
            case "right":
                this.model.position.x += this.moveSpeed
                this.rotate()
                break
            case "up-left":
                this.model.position.z -= this.moveSpeed / Math.sqrt(2)
                this.model.position.x -= this.moveSpeed / Math.sqrt(2)
                this.rotate()
                break
            case "up-right":
                this.model.position.z -= this.moveSpeed / Math.sqrt(2)
                this.model.position.x += this.moveSpeed / Math.sqrt(2)
                this.rotate()
                break
            case "down-left":
                this.model.position.z += this.moveSpeed / Math.sqrt(2)
                this.model.position.x -= this.moveSpeed / Math.sqrt(2)
                this.rotate()
                break
            case "down-right":
                this.model.position.z += this.moveSpeed / Math.sqrt(2)
                this.model.position.x += this.moveSpeed / Math.sqrt(2)
                this.rotate()
                break
        }

        this.camera.updatePosition(this.model.position.x ,this.model.position.y, this.model.position.z)

    }

    updateJump()
    {
        const deltaTime = 0.020 ;
        this.jumpDuration += deltaTime;

        // 높이 계산
        const newY = this.jumpStartY + (this.jumpSpeed * this.jumpDuration) + (0.5 * this.gravity * Math.pow(this.jumpDuration, 2));
        
        if (newY <= 0.01) {
            this.model.position.y = 0;
            this.jumping = false;
        } else {
            this.model.position.y = newY;
        }
    }

    /**
     * Rotation
     */
    setAngle()
    {
        let normalizedAngle = this.model.rotation.y % (2*Math.PI)
        if (normalizedAngle<0)
        {
            normalizedAngle += 2*Math.PI
        }
        this.angle = (normalizedAngle + Math.PI) % (2 * Math.PI)
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
                    this.model.rotation.y = this.angle
                    return true
                }
                return false
                
            case "down":
                if(Math.PI - this.tolerance <= this.angle && this.angle < Math.PI + this.tolerance)
                {
                    this.setDirection()
                    this.model.rotation.y = this.angle
                    return true
                }
                return false

    
            case "right":
                if(1.5 * Math.PI - this.tolerance <= this.angle && this.angle < 1.5 * Math.PI + this.tolerance)
                {
                    this.setDirection()
                    this.model.rotation.y = this.angle
                    return true
                }
                return false

    
            case "left":
                if(0.5 * Math.PI - this.tolerance <= this.angle && this.angle < 0.5 * Math.PI + this.tolerance)
                {
                    this.setDirection()
                    this.model.rotation.y = this.angle
                    return true
                }
                return false

    
            case "up-left":
                if(0.25 * Math.PI - this.tolerance <= this.angle && this.angle < 0.25 * Math.PI + this.tolerance)
                {
                    this.setDirection()
                    this.model.rotation.y = this.angle
                    return true
                }
                return false

    
            case "down-right":
                if(1.25 * Math.PI - this.tolerance <= this.angle && this.angle < 1.25 * Math.PI + this.tolerance)
                {
                    this.setDirection()
                    this.model.rotation.y = this.angle
                    return true
                }
                return false


            case "up-right":
                if(1.75 * Math.PI - this.tolerance <= this.angle && this.angle < 1.75 * Math.PI + this.tolerance)
                {
                    this.setDirection()
                    this.model.rotation.y = this.angle
                    return true
                }
                return false

    
            case "down-left":
                if(0.75 * Math.PI - this.tolerance <= this.angle && this.angle < 0.75 * Math.PI + this.tolerance)
                {
                    this.setDirection()
                    this.model.rotation.y = this.angle
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
                this.angle = Math.PI
                break
                
            case "down":
                this.angle = 0
                break
    
            case "right":
                this.angle = 0.5 * Math.PI
                break
    
            case "left":
                this.angle = 1.5 * Math.PI
                break
    
            case "up-left":
                this.angle = 1.25 * Math.PI
                break
    
            case "down-right":
                this.angle = 0.25 * Math.PI
                break

            case "up-right":
                this.angle = 0.75 * Math.PI
                break
    
            case "down-left":
                this.angle = 1.75 * Math.PI
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

    destroy()
    {
        this.keyboard.off('keydown')
        this.keyboard.off('keyup')
    }

}