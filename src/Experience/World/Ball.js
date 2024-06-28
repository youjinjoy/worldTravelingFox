import * as THREE from 'three'

import Experience from "../Experience"

export default class Ball
{
    constructor(radius = 1, position = { x: 0, y: 0, z: 0 }, color = 'red')
    {
        this.experience = new Experience()

        this.radius = radius
        this.color = color

        this.setGeometry()
        // this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setPosition(position)
        
        return this.mesh
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
        this.mesh.position.set(position.x,position.y,position.z)
    }

}