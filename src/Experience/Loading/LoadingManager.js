import * as THREE from 'three';

export const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        console.log('loaded')
    },

    // Progress
    () => {
        console.log('progress')
    }
)