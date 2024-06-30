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
        this.groundGeometry = new THREE.CircleGeometry(this.radius, 64)

        this.grassGeometry = new THREE.PlaneGeometry(this.radius*2, this.radius*2, 256, 256)
        // this.grassGeometry = new THREE.CircleGeometry(this.radius, 256)

        this.undergroundGeometry = new THREE.SphereGeometry(this.radius - 0.11, 32, 16, undefined, undefined,  0.5 * Math.PI, 0.5 * Math.PI)
        this.wireframeGeometry = new THREE.WireframeGeometry(this.undergroundGeometry)

        this.undergrassGeometry = new THREE.SphereGeometry(this.radius - 0.1, 64, 64, undefined, undefined,  0.5 * Math.PI, 0.05)
    }

    setTextures()
    {
        this.groundTextures = {}

        this.groundTextures.color = this.resources.items.groundColorTexture
        this.groundTextures.color.colorSpace = THREE.SRGBColorSpace
        this.groundTextures.color.repeat.set(10, 10)
        this.groundTextures.color.wrapS = THREE.RepeatWrapping
        this.groundTextures.color.wrapT = THREE.RepeatWrapping

        this.groundTextures.normal = this.resources.items.groundNormalTexture
        this.groundTextures.normal.repeat.set(10, 10)
        this.groundTextures.normal.wrapS = THREE.RepeatWrapping
        this.groundTextures.normal.wrapT = THREE.RepeatWrapping

        // grass
        this.grassTextures = {}

        this.grassTextures.color = this.resources.items.grassColorTexture
        this.grassTextures.color.colorSpace = THREE.SRGBColorSpace
        this.setTextureProperties(this.grassTextures.color, 10, 10)

        this.grassTextures.displacement = this.resources.items.grassDisplacementTexture
        this.setTextureProperties(this.grassTextures.displacement, 10, 10)

        this.grassTextures.normal = this.resources.items.grassNormalTexture
        this.setTextureProperties(this.grassTextures.normal, 10, 10)

        this.grassTextures.occlusion = this.resources.items.grassOcclusionTexture
        this.setTextureProperties(this.grassTextures.occlusion, 10, 10)

        this.grassTextures.roughness = this.resources.items.grassRoughnessTexture
        this.setTextureProperties(this.grassTextures.roughness, 10, 10)

        this.grassTextures.alpha = this.resources.items.grassAlphaTexture
        this.setTextureProperties(this.grassTextures.roughness, 10, 10)
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
        })
        
        this.grassMaterial = new THREE.MeshStandardMaterial({
            map: this.grassTextures.color,
            normalMap: this.grassTextures.normal,
            displacementMap: this.grassTextures.displacement,
            displacementScale: 0.2,
            // displacementBias: -0.1,
            aoMap: this.grassTextures.displacement,
            roughnessMap: this.grassTextures.roughness,
            alphaMap: this.grassTextures.alpha,
            transparent: true,
            depthWrite: false
        })
        

        this.undergroundMaterial = new THREE.MeshStandardMaterial(
            { wireframe: true}
        )

        this.lineMaterial = new THREE.LineBasicMaterial(
            {
                opacity : 0.5,
                transparent : true
            }
        )

        this.undergrassMaterial = new THREE.MeshBasicMaterial({
            map: this.grassTextures.color,
            normalMap: this.grassTextures.normal,
            displacementMap: this.grassTextures.displacement,
            displacementScale: 2,
            aoMap: this.grassTextures.displacement,
            roughnessMap: this.grassTextures.roughness
        })
    }

    setMesh()
    {
        // ground
        this.groundMesh = new THREE.Mesh(this.groundGeometry, this.groundMaterial)
        this.groundMesh.rotation.x = - Math.PI * 0.5
        this.groundMesh.position.y = - 0.01
        this.groundMesh.receiveShadow = true
        this.scene.add(this.groundMesh)

        // grass
        this.grassMesh = new THREE.Mesh(this.grassGeometry, this.grassMaterial)
        this.grassMesh.rotation.x = - Math.PI * 0.5
        this.grassMesh.receiveShadow = true
        this.grassMesh.position.y -= 0.01
        this.scene.add(this.grassMesh)

        // underground
        // this.undergroundMesh = new THREE.LineSegments( this.wireframeGeometry, this.lineMaterial )
        // this.undergroundMesh.position.y -= 0.02
        // this.scene.add(this.undergroundMesh)
        
        // underground grass
        this.undergrassMesh = new THREE.Mesh( this.undergrassGeometry, this.undergrassMaterial )
        this.undergrassMesh.position.y -= 0.01
        this.scene.add(this.undergrassMesh)
    }
}