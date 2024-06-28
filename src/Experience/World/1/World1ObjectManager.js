import Group from "../../Utils/Group";

export default class World1ObjectManager extends Group
{
    constructor(name)
    {
        super(name)
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