import vertexShader from './shaders/ocean/vertex.glsl'
import fragmentShader from './shaders/ocean/fragment.glsl'
import surfaceVertexShader from './shaders/oceanSurface/vertex.glsl'
import surfaceFragmentShader from './shaders/oceanSurface/fragment.glsl'
import * as THREE from 'three'
import Experience from '../Experience'

export default class Ocean
{
    constructor(radius)
    {
        this.radius = radius

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.colorObject = {}
        this.colorObject.depthColor = '#186691'
        this.colorObject.surfaceColor = '#9bd8ff'

        this.setGeometry()
        this.setMaterial()
        this.setMesh()

        if(this.debug.active)
        {
            this.oceanFolder = this.debug.ui.addFolder('ocean')
            this.oceanFolder.add(this.material.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
            this.oceanFolder.add(this.material.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
            this.oceanFolder.add(this.material.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
            this.oceanFolder.add(this.material.uniforms.uBigWavesSpeed, 'value').min(0).max(10).step(0.001).name('uBigWavesSpeed')
            this.oceanFolder.addColor(this.colorObject, 'depthColor').onChange(() => { this.material.uniforms.uDepthColor.value.set(this.colorObject.depthColor) })
            this.oceanFolder.addColor(this.colorObject, 'surfaceColor').onChange(() => { this.material.uniforms.uSurfaceColor.value.set(this.colorObject.surfaceColor) })
            this.oceanFolder.add(this.material.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
            this.oceanFolder.add(this.material.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
            this.oceanFolder.add(this.material.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
            this.oceanFolder.add(this.material.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')

            this.oceanSurfaceFolder = this.debug.ui.addFolder('ocean surface')
            this.oceanSurfaceFolder.add(this.surfaceMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
            this.oceanSurfaceFolder.add(this.surfaceMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
            this.oceanSurfaceFolder.add(this.surfaceMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
            this.oceanSurfaceFolder.add(this.surfaceMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(10).step(0.001).name('uBigWavesSpeed')
            this.oceanSurfaceFolder.addColor(this.colorObject, 'depthColor').onChange(() => { this.surfaceMaterial.uniforms.uDepthColor.value.set(this.colorObject.depthColor) })
            this.oceanSurfaceFolder.addColor(this.colorObject, 'surfaceColor').onChange(() => { this.surfaceMaterial.uniforms.uSurfaceColor.value.set(this.colorObject.surfaceColor) })
            this.oceanSurfaceFolder.add(this.surfaceMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
            this.oceanSurfaceFolder.add(this.surfaceMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
            this.oceanSurfaceFolder.add(this.surfaceMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
            this.oceanSurfaceFolder.add(this.surfaceMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')

        }

    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(this.radius, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.43)
        this.surfaceGeometry = new THREE.PlaneGeometry(2*this.radius - 0.4, 2*this.radius - 0.4, 64, 64)
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms:
            {
                uBigWavesElevation: { value: 0.2 },
                uBigWavesFrequency: { value: new THREE.Vector2(0.5, 0.5) },
                uTime: { value: 0 },
                uBigWavesSpeed: { value: 1.2 },
                uDepthColor: { value: new THREE.Color(0x217eb0) },
                uSurfaceColor: { value: new THREE.Color(0x9bd8ff) },
                uColorOffset: { value: 0.18 },
                uColorMultiplier: { value: 2 },
                uSmallWavesElevation: { value: 0.1 },
                uSmallWavesFrequency: { value: 20 },
                uSmallWavesSpeed: { value: 0.3 },
                uSmallIterations: { value: 1 },
            },
            side: THREE.DoubleSide,
        })

        this.surfaceMaterial = new THREE.ShaderMaterial({
            vertexShader: surfaceVertexShader,
            fragmentShader: surfaceFragmentShader,
            uniforms:
            {
                uBigWavesElevation: { value: 0.125 },
                uBigWavesFrequency: { value: new THREE.Vector2(0.5, 0.5) },
                uTime: { value: 0 },
                uBigWavesSpeed: { value: 1.2 },
                uDepthColor: { value: new THREE.Color(0x2882b6) },
                uSurfaceColor: { value: new THREE.Color(0x95d6fe) },
                uColorOffset: { value: 0.18 },
                uColorMultiplier: { value: 2 },
                uSmallWavesElevation: { value: 0.15 },
                uSmallWavesFrequency: { value: 20 },
                uSmallWavesSpeed: { value: 0.3 },
                uSmallIterations: { value: 1 },
            },
            transparent: true,
            depthWrite: false
            
        })

    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.z = Math.PI
        this.mesh.position.y -= 1
        this.scene.add(this.mesh)
        
        this.surface = new THREE.Mesh(this.surfaceGeometry, this.surfaceMaterial)
        this.surface.rotation.x = - Math.PI * 0.5
        this.surface.position.y -= 3.6
        this.scene.add(this.surface)
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.002
        this.surfaceMaterial.uniforms.uTime.value = this.time.elapsed * 0.002
    }

}