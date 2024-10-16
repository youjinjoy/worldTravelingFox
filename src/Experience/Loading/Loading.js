import * as THREE from 'three'
import { gsap } from 'gsap'

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position =  vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha );
        }
    `
})

/**
 * Loaders
 */
export const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
    },

    // Progress
    () => {
        console.log('progress')
    }
)


export const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)