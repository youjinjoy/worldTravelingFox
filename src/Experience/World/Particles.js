import * as THREE from "three"
import Experience from "../Experience"

export default class Particles
{
    constructor(radius)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.radius = radius

        this.setParticlesGeometry()
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setParticlesGeometry()
    {
        this.particlesGeometry = new THREE.BufferGeometry()
        this.count = 1000

        const positions = new Float32Array(this.count * 3);

        for(let i = 0 ; i < this.count * 3 ; i++)
        {
            positions[i] = (Math.random() - 0.5) * this.radius * 10

            if (Math.abs(positions[i]) < this.radius)
            {
                positions[i] *= 2
            }
        }

        this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) 
    }

    setGeometry()
    {


        this.geometry = new THREE.SphereGeometry(5,64)
    }

    setMaterial()
    {
        this.material = new THREE.PointsMaterial(
            {
                size: 0.4,
                sizeAttenuation: true
            }
        )
    }

    setMesh()
    {
        this.mesh = new THREE.Points(this.particlesGeometry, this.material)
        this.scene.add(this.mesh)
    }
}