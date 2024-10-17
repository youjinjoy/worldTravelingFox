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
const loadingBarElement = document.querySelector('.loading-bar');

export const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        window.setTimeout(() => {
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
            
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
        }, 500)

        gsap.delayedCall(0.5, () => {
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
            
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
        })
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded/itemsTotal;
        loadingBarElement.style.transform = `scale(${progressRatio})`
    }
)


export const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)