export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'groundColorTexture',
        type: 'texture',
        path: 'textures/dirt/color.jpg'
    },
    {
        name: 'groundNormalTexture',
        type: 'texture',
        path: 'textures/dirt/normal.jpg'
    },
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: 'models/Fox/glTF/Fox.gltf'
    },
    {
        name: 'dynamicShadow',
        type: 'texture',
        path: 'textures/fakeShadows/simpleShadow.jpg'
    },
    {
        name: 'staticShadow',
        type: 'texture',
        path: 'textures/fakeShadows/bakedShadow_mirror.jpg'
    },
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/grass/color.jpg'
    },
    {
        name: 'grassDisplacementTexture',
        type: 'texture',
        path: 'textures/grass/displacement.png'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/grass/normal.jpg'
    },
    {
        name: 'grassOcclusionTexture',
        type: 'texture',
        path: 'textures/grass/occlusion.jpg'
    },
    {
        name: 'grassRoughnessTexture',
        type: 'texture',
        path: 'textures/grass/roughness.jpg'
    },
    {
        name: 'grassAlphaTexture',
        type: 'texture',
        path: 'textures/grass/alpha.png'
    }
]