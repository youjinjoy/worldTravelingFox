import EventEmitter from './EventEmitter.js'

export default class Keyboard extends EventEmitter
{
    constructor()
    {
        super()
        
        this.keyState = {};
    }
}