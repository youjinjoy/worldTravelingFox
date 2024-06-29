import * as THREE from 'three'
import Experience from '../Experience'

export default class Sky
{
    // 구 모양의 돔 내부를 하늘처럼 보이게 하기
    constructor(radius)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.radius = radius
        
        this.setGeometry()
        // this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(this.radius+0.01,32,64)
    }

    setMaterial()
    {
        this.material = new THREE.MeshPhongMaterial(
            {
                color: "#4e8ade",
                side: THREE.DoubleSide,
                opacity: 0.2,
                transparent: true
            })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
}