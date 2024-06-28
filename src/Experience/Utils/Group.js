import * as THREE from 'three'
import Experience from '../Experience'

const groupNames = {}

export default class Group
{
    constructor(name)
    {
        // 이미 만든 그룹 있으면 해당 그룹 return
        if(groupNames[name])
        {
            return groupNames[name]
        }

        this.group = new THREE.Group()
        groupNames[name] = this.group

        this.experience = new Experience()
        this.experience.scene.add(this.group)

        return this.group
    }

    addGroup(model)
    {
        this.group.add(model)
    }

    setPosition(x, y, z)
    {
        this.group.position.set(x, y, z)
    }

    setAngle(x, y, z)
    {
        this.group.rotation.set(x, y, z)
    }
}