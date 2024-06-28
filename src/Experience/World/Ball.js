import * as THREE from 'three'

import Experience from "../Experience"
import World1ObjectManager from './1/World1ObjectManager'

export default class Ball extends World1ObjectManager
{
    constructor(radius = 1, position = { x: 0, y: 0, z: 0 }, color = 'red')
    {
        super()

        this.experience = new Experience()

        this.radius = radius
        this.position = position
        this.color = color

        this.setGeometry()
        // this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setPosition(position)
        
        this.world1Group.add(this.mesh)
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
        
        const textureLoader = new THREE.TextureLoader()
        this.bakedShadow = textureLoader.load('/textures/fakeShadows/bakedShadow_mirror.jpg',
        (texture) =>
        {
            this.bakedShadow.colorSpace = THREE.SRGBColorSpace

            console.log(texture)

            this.plane = new THREE.Mesh(
                new THREE.PlaneGeometry(this.radius*2, this.radius*2),
                new THREE.MeshBasicMaterial({
                    color: '#000',
                    map: texture,
                    transparent: true,
                    alphaMap: texture,
                    alphaTest: 0.15,
                    depthWrite: false,
                })
            )

            this.plane.scale.x = this.scaleCoefficient
            this.plane.scale.y = this.scaleCoefficient
            this.plane.rotation.x = - Math.PI * 0.5
            this.plane.rotation.z = Math.PI * 0.5
            this.plane.position.set(this.position.x, this.position.y + 0.02, this.position.z)
            console.log(this.plane)
            
            this.world1Group.add(this.plane)
            // console.log(this.world1Group)
        }, undefined,
        (error) => {console.log(error)})
        


    }
}