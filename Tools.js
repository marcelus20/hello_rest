/**
 * class made to gather useful functions to be used as tools in index.js
 * Usually boolean return type for checking type of an argument is the expected.
 */
class Tools{
    static isUndefined(arg){return typeof arg == 'undefined'};
    static isNumber(arg){return typeof arg == 'number'};
    static isObject(arg){return typeof arg =='object'};
}

module.exports = Tools;