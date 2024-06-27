import * as THREE from 'three'
import Ball from '../Ball'
import Experience from '../../Experience'

export default class BouncingBall
{
    constructor(radius, position, color, floor)
    {
        this.radius = radius
        this.position = position
        this.color = color
        this.floor = floor
        
        this.ball = new Ball(this.radius, this.position, this.color)

        
        this.experience = new Experience()
        this.experience.scene.add(this.ball)
        this.time = this.experience.time
        
        const textureLoader = new THREE.TextureLoader()
        textureLoader.load('textures/fakeShadows/simpleShadow.jpg',
        (texture) => {
            this.simpleShadow = texture
            this.setFakeShadow()       
        })
        , undefined,
        (error) => {
            console.log(error)
        }
    }

    setFakeShadow()
    {
        this.sphereShadow = new THREE.Mesh(
            new THREE.CircleGeometry(this.radius),
            new THREE.MeshBasicMaterial({
                color: 0x282828,
                transparent: true,
                alphaMap: this.simpleShadow
            })
        )
        this.sphereShadow.rotation.x = - Math.PI * 0.5
        this.sphereShadow.position.y = this.floor.position.y + 0.05

        this.experience.scene.add(this.sphereShadow)
    }

    update()
    {
        this.ball.position.x = this.position.x + Math.cos(this.time.elapsed * 0.001 * Math.PI * 0.66)
        this.ball.position.z = this.position.z + Math.sin(this.time.elapsed * 0.001 * Math.PI * 0.66)
        this.ball.position.y = this.radius + Math.abs(Math.sin(this.time.elapsed * 0.003)) * 3

        // Update the shadow
        if (this.sphereShadow)
        {
            this.sphereShadow.position.x = this.ball.position.x
            this.sphereShadow.position.z = this.ball.position.z
            this.sphereShadow.material.opacity = (1 - this.ball.position.y/(3+this.radius))+0.7
        }
    }
}