import * as THREE from 'three'
import Ball from '../Ball'
import Experience from '../../Experience'
import World1ObjectManager from './World1ObjectManager'
import tinycolor from "https://esm.sh/tinycolor2";

export default class BouncingBall extends World1ObjectManager
{
    constructor(radius = 1, position = { x: 0, y: 0, z: 0 }, color = 'red', floor = null)
    {
        super()
        
        this.radius = radius
        this.position = position
        this.color = color
        this.floor = floor

        this.ball = new Ball(this.radius, this.position, this.color)
        this.setProperty()
        this.world1Group.add(this.ball)
        
        this.experience = new Experience()
        // this.experience.scene.add(this.ball) ... world1 그룹에서 scene.add 해줌
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

    setProperty()
    {
        this.start = 0
        this.orbitRadius = 1
        this.bounce = 3
        this.bounceHeight = 3

        this.shadowColor = this.makeShadowColor(this.color)
        this.shadowAngleXCoefficient = -3
        this.shadowAngleZCoefficient = 1
        this.shadowOpacityCoefficient = 0.7
    }

    makeShadowColor(color) {

        const originalColor = tinycolor(color)
        const shadowColor = originalColor.darken(80)

        return shadowColor.toHexString()
    }

    setFakeShadow()
    {
        this.sphereShadow = new THREE.Mesh(
            new THREE.CircleGeometry(this.radius),
            new THREE.MeshBasicMaterial({
                color: this.shadowColor,
                transparent: true,
                alphaMap: this.simpleShadow,
                depthWrite: false
            })
        )
        this.sphereShadow.rotation.x = - Math.PI * 0.5
        this.sphereShadow.position.y = 0.02
        this.sphereShadow.scale.x = - this.shadowAngleXCoefficient * 0.5
        this.sphereShadow.scale.z = this.shadowAngleZCoefficient * 0.5
        
        this.experience.scene.add(this.sphereShadow)
    }

    updateCircularMotion()
    {
        const theta = this.start + this.time.elapsed * 0.001 * 2 * Math.PI / this.bounce
        this.ball.position.x = this.position.x + Math.cos(theta) * this.orbitRadius
        this.ball.position.z = this.position.z + Math.sin(theta) * this.orbitRadius
        this.ball.position.y = this.radius + Math.abs(Math.sin(this.start + this.time.elapsed * 0.003)) * this.bounceHeight

        // Update the shadow
        if (this.sphereShadow)
        {
            this.sphereShadow.position.x = this.ball.position.x + this.shadowAngleXCoefficient*this.radius*this.ball.position.y
            this.sphereShadow.position.z = this.ball.position.z + this.shadowAngleZCoefficient*this.radius*this.ball.position.y
            this.sphereShadow.material.opacity = (1 - this.ball.position.y/(this.bounceHeight+this.radius))+this.shadowOpacityCoefficient
        }
    }

    updateVerticalMotion()
    {
        this.ball.position.y = this.radius + Math.abs(Math.sin(this.start + this.time.elapsed * 0.003)) * this.bounceHeight
        
        // Update the shadow
        if (this.sphereShadow)
        {
            this.sphereShadow.position.x = this.ball.position.x + this.shadowAngleXCoefficient*this.radius*this.ball.position.y
            this.sphereShadow.position.z = this.ball.position.z + this.shadowAngleZCoefficient*this.radius*this.ball.position.y
            this.sphereShadow.material.opacity = (1 - this.ball.position.y/(this.bounceHeight+this.radius))+this.shadowOpacityCoefficient
        }
    }
}