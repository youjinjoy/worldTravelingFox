import * as THREE from "three"
import Experience from "../Experience"

let num = 1

export default class Galaxy
{
    constructor({        
        id = num++,
        position = { x: 15, y: 2, z: -40},
        rotation = { x: Math.PI * 0.1, y: Math.PI * 0.4, z: 0},
        appearance = { size: 0.1, count: 2000, radius: 3, branches: 4, spin: 1 },
        randomness = { value: 0.2, power: 3 },
        colors = { inside: 0xff6030, outside: 0x1b3984 },
        animation = { speed: 0.0003, direction: 1 }
    } = {})
    {

        this.id = id
        // Position
        this.posX = position.x
        this.posY = position.y
        this.posZ = position.z

        // Rotation
        this.rotX = rotation.x
        this.rotY = rotation.y
        this.rotZ = rotation.z

        // Appearance
        this.size = appearance.size
        this.count = appearance.count
        this.radius = appearance.radius
        this.branches = appearance.branches
        this.spin = appearance.spin

        // Randomness
        this.randomness = randomness.value
        this.randomnessPower = randomness.power

        // Colors
        this.insideColor = colors.inside
        this.outsideColor = colors.outside

        // Animation
        this.speed = animation.speed
        this.direction = animation.direction

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.time = this.experience.time

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder(`galaxy${this.id}`)
            this.positionFolder = this.debugFolder.addFolder('position')
            this.rotationFolder = this.debugFolder.addFolder('rotation')
            this.apperanceFolder = this.debugFolder.addFolder('apperance')
            this.randomnessFolder = this.debugFolder.addFolder('randomness')
            this.colorsFolder = this.debugFolder.addFolder('colors')
            this.animationsFolder = this.debugFolder.addFolder('animations')

            // positions
            this.positionFolder.add(this, 'posX').name('positionX').min(-100).max(100).step(0.5).onChange(() => {
                this.mesh.position.x = this.posX
            })

            this.positionFolder.add(this, 'posY').name('positionY').min(-40).max(40).step(0.5).onChange(() => {
                this.mesh.position.y = this.posY
            })

            this.positionFolder.add(this, 'posZ').name('positionZ').min(-85).max(-20).step(0.5).onChange(() => {
                this.mesh.position.z = this.posZ
            })

            // rotation
            this.rotationFolder.add(this, 'rotX').name('rotationX').min(0).max(2*Math.PI).step(Math.PI*0.02).onChange(() => {
                this.mesh.rotation.x = this.rotX
            })

            this.rotationFolder.add(this, 'rotY').name('rotationY').min(0).max(2*Math.PI).step(Math.PI*0.02).onChange(() => {
                this.mesh.rotation.y = this.rotY
            })

            this.rotationFolder.add(this, 'rotZ').name('rotationZ').min(0).max(2*Math.PI).step(Math.PI*0.02).onChange(() => {
                this.mesh.rotation.z = this.rotZ
            })


            // galaxy apperance
            this.apperanceFolder.add(this, 'size').min(0.01).max(1).step(0.01).onChange(() => {
                this.material.size = this.size
            })

            this.apperanceFolder.add(this, 'count').min(100).max(5000).step(100).onChange(() => {
                this.setGalaxyGeometry()
                this.setMesh()
            })

            this.apperanceFolder.add(this, 'radius').min(0.01).max(20).step(0.01).onChange(() => {
                this.setGalaxyGeometry()
                this.setMesh()
            })

            this.apperanceFolder.add(this, 'branches').min(2).max(20).step(1).onChange(() => {
                this.setGalaxyGeometry()
                this.setMesh()
            })

            this.apperanceFolder.add(this, 'spin').min(-5).max(5).step(0.001).onChange(() => {
                this.setGalaxyGeometry()
                this.setMesh()
            })

            this.randomnessFolder.add(this, 'randomness').min(0).max(2).step(0.001).onChange(() => {
                this.setGalaxyGeometry()
                this.setMesh()
            })

            this.randomnessFolder.add(this, 'randomnessPower').min(1).max(10).step(0.001).onChange(() => {
                this.setGalaxyGeometry()
                this.setMesh()
            })

            // colors
            this.colorsFolder.addColor(this, 'insideColor').onChange(() => {
                this.setMaterial()
                this.setGalaxyGeometry()
                this.setMesh()
            })

            this.colorsFolder.addColor(this, 'outsideColor').onChange(() => {
                this.setMaterial()
                this.setGalaxyGeometry()
                this.setMesh()
            })

            // rotating speed
            this.animationsFolder.add(this, 'speed').name('rotating speed').min(0).max(0.01).step(0.0001)
            this.animationsFolder.add(this, 'direction', { counterclockwise: 1, clockwise: -1 }).name('rotating direction').onChange(() => {
                console.log(this.direction)
            })
        }

        this.setMaterial()
        this.setGalaxyGeometry()
        this.setMesh()
    }

    setMaterial()
    {
        this.material = new THREE.PointsMaterial(
            {
                size: this.size,
                sizeAttenuation: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true
            }
        )
    }

    setGalaxyGeometry()
    {
        this.geometry = new THREE.BufferGeometry()

        const positions = new Float32Array(this.count * 3)
        const colors = new Float32Array(this.count * 3)

        for(let i = 0; i < this.count; i++)
        {
            const i3 = i * 3
            const radius = Math.random() * this.radius
            const spinAngle = radius * this.spin
            const branchAngle = (i % this.branches) / this.branches * Math.PI * 2
    
            const randomX = Math.pow(Math.random(), this.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.randomness * radius
            const randomY = Math.pow(Math.random(), this.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.randomness * radius
            const randomZ = Math.pow(Math.random(), this.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.randomness * radius

            positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX
            positions[i3 + 1] = randomY
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            const colorInside = new THREE.Color(this.insideColor)
            const colorOutside = new THREE.Color(this.outsideColor)        
            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / this.radius)

            colors[i3    ] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b
        }
    
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    }

    setMesh()
    {
        if(this.mesh !== null)
        {
            this.geometry.dispose()
            this.material.dispose()
            this.scene.remove(this.mesh)
        }

        this.mesh = new THREE.Points(this.geometry, this.material)
        this.mesh.position.set(this.posX, this.posY, this.posZ)
        this.mesh.rotation.set(this.rotX, this.rotY, this.rotZ)
        this.scene.add(this.mesh)
    }

    update()
    {
        this.mesh.rotation.y += this.time.delta * this.speed * this.direction
    }
}