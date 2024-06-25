import Experience from "../../Experience";

export default class ActiveKeyVisualizer
{
    constructor()
    {
        this.experience = new Experience()

        this.availableKeys = {
            up: document.getElementById('key-up'),
            left: document.getElementById('key-left'),
            down: document.getElementById('key-down'),
            right: document.getElementById('key-right'),
            shift: document.getElementById('key-shift'),
            space: document.getElementById('key-space')
        };

        this.keysActivateClass = 'active'

    }
    
    activateDirection(key)
    {
        switch (key)
        {
            case 'up':
                this.availableKeys.up.classList.add(this.keysActivateClass)
                break
            case 'left':
                this.availableKeys.left.classList.add(this.keysActivateClass)
                break
            case 'down':
                this.availableKeys.down.classList.add(this.keysActivateClass)
                break
            case 'right':
                this.availableKeys.right.classList.add(this.keysActivateClass)
                break
            case 'shift':
                this.availableKeys.shift.classList.add(this.keysActivateClass)
                break
        }
    }

    deactivateDirection(key)
    {
        switch (key)
        {
            case 'up':
                this.availableKeys.up.classList.remove(this.keysActivateClass)
                break
            case 'left':
                this.availableKeys.left.classList.remove(this.keysActivateClass)
                break
            case 'down':
                this.availableKeys.down.classList.remove(this.keysActivateClass)
                break
            case 'right':
                this.availableKeys.right.classList.remove(this.keysActivateClass)
                break
            case 'shift':
                this.availableKeys.shift.classList.remove(this.keysActivateClass)
                break
        }
    }

    toggleShift()
    {
        this.shiftStatus = this.shiftStatus? false : true

        this.shiftStatus ? this.availableKeys.shift.classList.add(this.keysActivateClass) : this.availableKeys.shift.classList.remove(this.keysActivateClass)
    }

    monitorSpace(spaceStatus)
    {
        spaceStatus ? this.availableKeys.space.classList.add(this.keysActivateClass) : this.availableKeys.space.classList.remove(this.keysActivateClass)
    }
}