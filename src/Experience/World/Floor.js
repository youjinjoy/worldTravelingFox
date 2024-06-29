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
        this.groundGeometry = new THREE.CircleGeometry(5, 64)

        this.grassGeometry = new THREE.CircleGeometry(this.radius - 0.1, 128)

        this.undergroundGeometry = new THREE.SphereGeometry(this.radius - 0.11, 32, 16, undefined, undefined,  0.5 * Math.PI, 0.5 * Math.PI)
        this.wireframeGeometry = new THREE.WireframeGeometry(this.undergroundGeometry)

        this.undergrassGeometry = new THREE.SphereGeometry(this.radius - 0.1, 64, 64, undefined, undefined,  0.5 * Math.PI, 0.05)
    }

    setTextures()
    {
        this.groundTextures = {}

        this.groundTextures.color = this.resources.items.groundColorTexture
        this.groundTextures.color.colorSpace = THREE.SRGBColorSpace
        this.groundTextures.color.repeat.set(1.5, 1.5)
        this.groundTextures.color.wrapS = THREE.RepeatWrapping
        this.groundTextures.color.wrapT = THREE.RepeatWrapping

        this.groundTextures.normal = this.resources.items.groundNormalTexture
        this.groundTextures.normal.repeat.set(1.5, 1.5)
        this.groundTextures.normal.wrapS = THREE.RepeatWrapping
        this.groundTextures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial()
    {
        this.groundMaterial = new THREE.MeshStandardMaterial({
            map: this.groundTextures.color,
            normalMap: this.groundTextures.normal
        })
        
        this.grassMaterial = new THREE.MeshStandardMaterial({ color: "#007332"})

        this.undergroundMaterial = new THREE.MeshStandardMaterial(
            { wireframe: true}
        )

        this.lineMaterial = new THREE.LineBasicMaterial(
            {
                opacity : 0.2,
                transparent : true
            }
        )

        this.undergrassMaterial = new THREE.MeshBasicMaterial({ color: "#164a2d", opacity: 0.8})
    }

    setMesh()
    {
        // ground
        this.groundMesh = new THREE.Mesh(this.groundGeometry, this.groundMaterial)
        this.groundMesh.rotation.x = - Math.PI * 0.5
        this.groundMesh.receiveShadow = true
        this.scene.add(this.groundMesh)

        // grass
        this.grassMesh = new THREE.Mesh(this.grassGeometry, this.grassMaterial)
        this.grassMesh.rotation.x = - Math.PI * 0.5
        this.grassMesh.receiveShadow = true
        this.grassMesh.position.y -= 0.01
        this.scene.add(this.grassMesh)

        // underground
        this.undergroundMesh = new THREE.LineSegments( this.wireframeGeometry, this.lineMaterial )
        this.undergroundMesh.position.y -= 0.02
        this.scene.add(this.undergroundMesh)
        
        // underground grass
        this.undergrassMesh = new THREE.Mesh( this.undergrassGeometry, this.undergrassMaterial )
        this.undergrassMesh.position.y -= 0.01
        this.scene.add(this.undergrassMesh)
    }
}