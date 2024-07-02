import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor
{
    constructor(radius)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.radius = radius

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        // ground
        this.groundGeometry = new THREE.CircleGeometry(5, 64)

        // grass
        this.grassGeometry = new THREE.PlaneGeometry(this.radius*2 + 0.1, this.radius*2 + 0.1, 256, 256)
        // this.grassGeometry = new THREE.CircleGeometry(this.radius, 256)
        
        // undergrass
        this.undergrassGeometry = new THREE.CylinderGeometry(this.radius, this.radius, 1.1, 64, 1, true)
        const ugsUVs = this.undergrassGeometry.attributes.uv.array;
        for (let i = 0; i < ugsUVs.length; i += 2) {
        if (ugsUVs[i + 1] === 1 || ugsUVs[i + 1] === 0) {
            // 옆면의 u 좌표를 조정하여 가로 길이를 늘림
            ugsUVs[i] *= 64;  // 64배로 늘리는 예시, 필요에 따라 값을 조정하세요.
            }
        }
        this.undergrassGeometry.attributes.uv.needsUpdate = true;

        // underground
        this.undergroundGeometry = new THREE.CylinderGeometry(this.radius, this.radius, 1.2, 64, 1, true)
        const ugdUVs = this.undergroundGeometry.attributes.uv.array;
        for (let i = 0; i < ugdUVs.length; i += 2) {
        if (ugdUVs[i + 1] === 1 || ugdUVs[i + 1] === 0) {
            // 옆면의 u 좌표를 조정하여 가로 길이를 늘림
            ugdUVs[i] *= 64;  // 64배로 늘리는 예시, 필요에 따라 값을 조정하세요.
            }
        }
        this.undergroundGeometry.attributes.uv.needsUpdate = true;

        this.fakeGroundGeometry = new THREE.CircleGeometry(this.radius,64)
    }

    setTextures()
    {
        // ground
        this.groundTextures = {}

        this.groundTextures.color = this.resources.items.groundColorTexture
        this.groundTextures.color.colorSpace = THREE.SRGBColorSpace
        this.groundTextures.color.repeat.set(5, 5)
        this.groundTextures.color.wrapS = THREE.RepeatWrapping
        this.groundTextures.color.wrapT = THREE.RepeatWrapping

        this.groundTextures.normal = this.resources.items.groundNormalTexture
        this.groundTextures.normal.repeat.set(5, 5)
        this.groundTextures.normal.wrapS = THREE.RepeatWrapping
        this.groundTextures.normal.wrapT = THREE.RepeatWrapping

        // underground
        this.undergroundTextures = {}

        this.undergroundTextures.color = this.resources.items.groundColorTexture.clone()
        this.undergroundTextures.color.colorSpace = THREE.SRGBColorSpace
        this.undergroundTextures.color.repeat.set(1.5, 1.5)
        this.undergroundTextures.color.wrapS = THREE.RepeatWrapping
        this.undergroundTextures.color.wrapT = THREE.RepeatWrapping

        this.undergroundTextures.normal = this.resources.items.groundNormalTexture.clone()
        this.undergroundTextures.normal.repeat.set(1.5, 1.5)
        this.undergroundTextures.normal.wrapS = THREE.RepeatWrapping
        this.undergroundTextures.normal.wrapT = THREE.RepeatWrapping

        // grass
        this.grassTextures = {}

        this.grassTextures.color = this.resources.items.grassColorTexture
        this.grassTextures.color.colorSpace = THREE.SRGBColorSpace
        
        this.grassTextures.displacement = this.resources.items.grassDisplacementTexture
        this.grassTextures.normal = this.resources.items.grassNormalTexture
        
        this.grassTextures.occlusion = this.resources.items.grassOcclusionTexture
        
        
        this.grassTextures.roughness = this.resources.items.grassRoughnessTexture
        
        this.grassTextures.alpha = this.resources.items.grassAlphaTexture

        // undergrass
        this.undergrassTextures = {}

        this.undergrassTextures.color = this.resources.items.grassColorTexture.clone()

        this.undergrassTextures.color.colorSpace = THREE.SRGBColorSpace
        
        this.undergrassTextures.displacement = this.resources.items.grassDisplacementTexture.clone()
        
        this.undergrassTextures.normal = this.resources.items.grassNormalTexture.clone()

        this.undergrassTextures.occlusion = this.resources.items.grassOcclusionTexture.clone()

        this.undergrassTextures.roughness = this.resources.items.grassRoughnessTexture.clone()
    }

    setTextureProperties(texture, repeatX, repeatY)
    {
        texture.repeat.set(repeatX, repeatY)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
    }

    setMaterial()
    {
        this.groundMaterial = new THREE.MeshStandardMaterial({
            map: this.groundTextures.color,
            normalMap: this.groundTextures.normal,
            color: '#e6b950'
        })

        this.undergroundMaterial = new THREE.MeshBasicMaterial({
            color: '#aaa',
            map: this.undergroundTextures.color,
            // normalMap: this.undergroundTextures.normal,
            // side: THREE.DoubleSide,
            // depthWrite: false
        })
        
        // grass

        this.setTextureProperties(this.grassTextures.color, 20, 20)
        this.setTextureProperties(this.grassTextures.displacement, 20, 20)
        this.setTextureProperties(this.grassTextures.normal, 20, 20)
        this.setTextureProperties(this.grassTextures.occlusion, 20, 20)
        this.setTextureProperties(this.grassTextures.roughness, 20, 20)

        this.grassMaterial = new THREE.MeshStandardMaterial({
            map: this.grassTextures.color,
            normalMap: this.grassTextures.normal,
            displacementMap: this.grassTextures.displacement,
            displacementScale: 0.3,
            displacementBias: -0.1,
            aoMap: this.grassTextures.displacement,
            roughnessMap: this.grassTextures.roughness,
            alphaMap: this.grassTextures.alpha,
            transparent: true,
            depthWrite: false,
        })

        // undergrass
        
        this.setTextureProperties(this.undergrassTextures.color, 1, 1)
        this.setTextureProperties(this.undergrassTextures.displacement, 1, 1)
        this.setTextureProperties(this.undergrassTextures.normal, 1, 1)
        this.setTextureProperties(this.undergrassTextures.occlusion, 1, 1)
        this.setTextureProperties(this.undergrassTextures.roughness, 1, 1)

        this.undergrassMaterial = new THREE.MeshBasicMaterial({
            color: '#aaa',
            map: this.undergrassTextures.color,
            // normalMap: this.undergrassTextures.normal,
            // displacementMap: this.undergrassTextures.displacement,
            // displacementScale: 0.2,
            // displacementBias: -0.1,
            // aoMap: this.undergrassTextures.displacement,
            // roughnessMap: this.undergrassTextures.roughness,
            // side: THREE.DoubleSide,
            // alphaMap: this.undergrassTextures.alpha,
            // transparent: true,
            // depthWrite: false
        })

        this.fakeGroundMaterial = new THREE.MeshBasicMaterial()
    }

    setMesh()
    {
        // ground
        // this.groundMesh = new THREE.Mesh(this.groundGeometry, this.groundMaterial)
        // this.groundMesh.rotation.x = - Math.PI * 0.5
        // this.groundMesh.position.y = 0.2
        // this.groundMesh.receiveShadow = true
        // this.scene.add(this.groundMesh)

        // grass
        this.grassMesh = new THREE.Mesh(this.grassGeometry, this.grassMaterial)
        this.grassMesh.rotation.x = - Math.PI * 0.5
        this.grassMesh.receiveShadow = true
        this.grassMesh.position.y -= 0.01
        this.scene.add(this.grassMesh)

        // undergrass
        this.undergrassMesh = new THREE.Mesh(this.undergrassGeometry, this.undergrassMaterial)
        this.undergrassMesh.rotation.x = - Math.PI * 0.5
        this.undergrassMesh.position.y = - 0.4
        this.undergrassMesh.receiveShadow = false
        this.undergrassMesh.rotation.x = Math.PI
        this.scene.add(this.undergrassMesh)

        // underground
        this.undergroundMesh = new THREE.Mesh(this.undergroundGeometry, this.undergroundMaterial)
        this.undergroundMesh.rotation.x = - Math.PI * 0.5
        this.undergroundMesh.position.y = - 1.55
        this.undergroundMesh.receiveShadow = false
        this.undergroundMesh.rotation.x = Math.PI
        this.scene.add(this.undergroundMesh)

        this.fakeGroundMesh = new THREE.Mesh(this.fakeGroundGeometry, this.groundMaterial)
        this.fakeGroundMesh.rotation.x = - Math.PI * 0.5
        this.fakeGroundMesh.position.y = -0.01
        this.fakeGroundMesh.receiveShadow = true
        this.scene.add(this.fakeGroundMesh)
    }
}