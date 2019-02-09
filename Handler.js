/**
 * class to represent Handler object. The parameters passed in the constructor are definitely a function that gets
 * data and callback params
 */
class Handler{
    constructor({hello, notFound}){
        this.hello = hello;
        this.notFound = notFound;
    }
}

module.exports = Handler;