export default class Movable
{
    constructor()
    {
        this.moveSpeed = 0.1;
        this.rotateSpeed = 0.1;
        this.moving = false;
        this.isRotate = true;
        this.angle = 0;
        this.direction = "up";
    }
}