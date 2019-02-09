//imports
const url = require('url')

/**
 * class to represent the data populated by the values obtained from the request parameter and payload.
 * This blueprint is to store useful information for sending off back as response.
 */
class Data{
    constructor(req, payload){
        const parsedUrl = url.parse(req.url, true);
        this.trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
        this.queryString = parsedUrl.query;
        this.method = req.method.toLowerCase();
        this.headers = req.headers;
        this.payload = payload;
    }
};

module.exports = Data;