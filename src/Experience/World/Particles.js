import * as THREE from "three"
import Experience from "../Experience"

export default class Particles
{
    constructor(radius)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.radius = radius

        this.particlesGeometry = new THREE.BufferGeometry()
        this.count = 2000

        this.setParticlesGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setParticlesGeometry()
    {
        const positions = new Float32Array(this.count * 3);

        for(let i = 0 ; i < this.count * 3 ; i += 3)
        {
            positions[i] = (Math.random() - 0.5) * this.radius * 8
            positions[i+1] = (Math.random() - 0.5) * this.radius * 8
            positions[i+2] = (Math.random() - 0.5) * this.radius * 8

            const x = positions[i]
            const y = positions[i+1]
            const z = positions[i+2]

            if (x * x + y * y + z * z <= this.radius * this.radius)
            {
                positions[i] = positions[i] > 0 ? positions[i] + this.radius : positions[i] - this.radius
                positions[i+1] = positions[i+1] > 0 ? positions[i+1] + this.radius : positions[i+1] - this.radius
                positions[i+2] = positions[i+2] > 0 ? positions[i+2] + this.radius : positions[i+2] - this.radius
            }
        }

        this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) 
    }

    setSphereGeometry()
    {
        this.sphereGeometry = new THREE.SphereGeometry(5,64)
    }

    generateGalaxy()
    {

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