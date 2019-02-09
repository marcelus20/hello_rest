/**
 * class to represent a Router object. it may get more properties as it grows
 */
class Routers{
    constructor(handler){
        this.hello = handler.hello;
    }
}

module.exports = Routers;