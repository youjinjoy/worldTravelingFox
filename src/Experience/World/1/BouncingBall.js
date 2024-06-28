import * as THREE from 'three'
import Ball from '../Ball'
import Experience from '../../Experience'
import tinycolor from "https://esm.sh/tinycolor2";

export default class BouncingBall
{
    constructor(radius = 1, position = { x: 0, y: 0, z: 0 }, color = 'red', floor = null)
    {
        
        this.radius = radius
        this.position = position
        this.color = color
        this.floor = floor

        this.ball = new Ball(this.radius, this.position, this.color)
        this.bouncingBall = this.ball.mesh
        
        this.experience = new Experience()
        this.time = this.experience.time
        this.resources = this.experience.resources
        
        this.setProperty()
        this.setFakeShadow()

    }

    setProperty()
    {
        this.start = 0
        this.orbitRadius = 1
        this.bounce = 3
        this.bounceHeight = 3

        this.speed = 1

        this.shadowColor = this.makeShadowColor(this.color)
        this.shadowAngleXCoefficient = -3
        this.shadowAngleZCoefficient = 1
        this.shadowOpacityOffset = 0.7
    }

    makeShadowColor(color) {

        const originalColor = tinycolor(color)
        const shadowColor = originalColor.darken(80)

        return shadowColor.toHexString()
    }

    setFakeShadow()
    {
        this.simpleShadow = {}
        this.simpleShadow.map = this.resources.items.dynamicShadow
        this.simpleShadow.color = this.makeShadowColor(this.color)
        this.simpleShadow.colorSpace = THREE.SRGBColorSpace
        
        this.sphereShadow = new THREE.Mesh(
            new THREE.CircleGeometry(this.radius),
            new THREE.MeshBasicMaterial({
                color: this.simpleShadow.color,
                transparent: true,
                alphaMap: this.simpleShadow.map,
                depthWrite: false
            })
        )
        this.sphereShadow.rotation.x = - Math.PI * 0.5
        this.sphereShadow.position.y = 0.02
        this.sphereShadow.scale.x = - this.shadowAngleXCoefficient * 0.5
        this.sphereShadow.scale.z = this.shadowAngleZCoefficient * 0.5
        
        this.ball.group.add(this.sphereShadow)
    }

    updateCircularMotion()
    {
        const theta = this.start + this.time.elapsed * 0.001 * 2 * this.speed * Math.PI / this.bounce
        this.bouncingBall.position.x = this.position.x + Math.cos(theta) * this.orbitRadius
        this.bouncingBall.position.z = this.position.z + Math.sin(theta) * this.orbitRadius
        this.bouncingBall.position.y = this.radius + Math.abs(Math.sin(this.start + this.time.elapsed * 0.003)) * this.bounceHeight

        // Update the shadow
        if (this.sphereShadow)
        {
            this.sphereShadow.position.x = this.bouncingBall.position.x + this.shadowAngleXCoefficient*this.radius*this.bouncingBall.position.y
            this.sphereShadow.position.z = this.bouncingBall.position.z + this.shadowAngleZCoefficient*this.radius*this.bouncingBall.position.y
            this.sphereShadow.material.opacity = (1 - this.bouncingBall.position.y/(this.bounceHeight+this.radius)) + this.shadowOpacityOffset
        }
    }

    updateVerticalMotion()
    {
        this.bouncingBall.position.y = this.radius + Math.abs(Math.sin(this.start + this.time.elapsed * 0.003)) * this.bounceHeight
        
        // Update the shadow
        if (this.sphereShadow)
        {
            this.sphereShadow.position.x = this.bouncingBall.position.x + this.shadowAngleXCoefficient*this.radius*this.bouncingBall.position.y
            this.sphereShadow.position.z = this.bouncingBall.position.z + this.shadowAngleZCoefficient*this.radius*this.bouncingBall.position.y
            this.sphereShadow.material.opacity = (1 - this.bouncingBall.position.y/(this.bounceHeight+this.radius))+this.shadowOpacityOffset
        }
    }
}