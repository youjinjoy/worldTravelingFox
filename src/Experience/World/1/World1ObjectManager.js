import Group from "../../Utils/Group";

export default class World1ObjectManager
{
    constructor()
    {
        this.world1Group = new Group('world1')
    }

    addToGroup(model)
    {
        this.world1Group.add(model)
    }
    
    setPosition(x, y, z)
    {
        this.world1Group.position.set(x, y, z)
    }

    setRotation(x, y, z)
    {
        this.world1Group.rotation.set(x, y, z)
    }
}