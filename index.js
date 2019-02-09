/**
 * Author: Felipe Marcelus Mantovani
 * COURSE: NODEJS Masterclass
 * Platform: Pirple
 * Assignment: 1
 */

//imports
const http = require('http');
const StringDecoder = require('string_decoder').StringDecoder;
const Data = require('./Data');
const Routers = require('./Routers');
const Handler = require('./Handler');
const Tools = require('./Tools');


//creation of the server
const server = http.createServer((req, res)=>{ // gets requests and response
    //initialising decoder
    const decoder = new StringDecoder('utf-8');
    //initialising buffer
    let buffer = '';
    //while request is on data, fill up buffer with strings converted from bytes
    req.on('data', (data)=>{
       buffer += decoder.write(data);
    });

    //while request is on end, do the rest of the stuff
    req.on('end',()=>{
        //instantiate Data
        const data = new Data(req, buffer);
        //retrieve the function property of Router object if there is any else just use the handler not found method
        const route = Tools.isUndefined(routers[data.trimmedPath])? handler.notFound: routers[data.trimmedPath];

        //callback after route has been retrieved
        route(data, (statusCode, payload)=>{//callback gets statusCode and payload
            //if number, then 200, else the code itself
            statusCode = Tools.isNumber(statusCode) ? statusCode : 200;
            //if object, then payload, else an empty object
            payload = Tools.isObject(payload) ? payload : {};
            //telling browser that's a JSON applocation
            res.setHeader('Content-Type', 'application/json');
            //writing status code down to head response
            res.writeHead(statusCode);
            //finnaly sending response
            res.end(JSON.stringify(payload));
        });
    })
});

/**
 * creating the hello callback -> will be assigned to Handler object
 * @param data
 * @param callback
 */
const hello = (data, callback)=>{
    //if get, print simple message, if post, print bigger message along with what was posted by requester
    if(data.method === 'get'){
        callback(200, {'message': 'Hello, World!'})
    }else if(data.method === 'post'){
        callback(200, {'Dear Stranger, here is what you posted : ': JSON.stringify(data.payload)})
    }
};

/**
 * default not found callback -> to be assingned to Handler class
 * @param data
 * @param callback
 */
const notFound = (data, callback)=>{
    //passing status code but no message. The default message will be an empty object
    callback(404);
};

//instantiating handler object
const handler = new Handler({hello, notFound});
//instantiating routers object
const routers = new Routers(handler);
//making the server listen to post 300
server.listen(3000, ()=>console.log("Listening on port 3000"));