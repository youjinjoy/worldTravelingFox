import * as THREE from 'three';
/**
 * Overlay
 */

const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    vertexShader: `
        void main()
        {
            gl_Position =  vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, .0);
        }
    `

})

export const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)