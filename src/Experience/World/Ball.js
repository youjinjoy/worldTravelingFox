import * as THREE from 'three'

import Experience from "../Experience"
import World1ObjectManager from './1/World1ObjectManager'

export default class Ball
{
    constructor(radius = 1, position = { x: 0, y: 0, z: 0 }, color = 'red')
    {
        this.experience = new Experience()
        this.resources = this.experience.resources

        this.radius = radius
        this.position = position
        this.color = color

        this.setGeometry()
        // this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setPosition(position)

        this.group = new World1ObjectManager('world1')
        this.group.add(this.mesh)
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(this.radius)
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({ color: this.color })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }

    setPosition(position)
    {
        this.mesh.position.set(position.x,position.y+this.radius,position.z)
    }

    setProperty()
    {
        this.scaleCoefficient = 10
    }

    setBakedShadow()
    {
        this.setProperty()
        
        this.bakedShadow = {}
        this.bakedShadow.color = '#000'
        this.bakedShadow.map = this.resources.items.staticShadow

        this.bakedShadow.colorSpace = THREE.SRGBColorSpace
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(this.radius*2, this.radius*2),
            new THREE.MeshBasicMaterial(
                {
                color: this.bakedShadow.color,
                map: this.bakedShadow.map,
                transparent: true,
                alphaMap: this.bakedShadow.map,
                alphaTest: 0.5,
                depthWrite: false,
            })
        )

        this.plane.scale.x = this.scaleCoefficient
        this.plane.scale.y = this.scaleCoefficient
        this.plane.rotation.x = - Math.PI * 0.5
        this.plane.rotation.z = Math.PI * 0.3
        this.plane.position.set(this.position.x - 0.05, this.position.y, this.position.z + 0.05)

        this.group.add(this.plane)
        


    }
}