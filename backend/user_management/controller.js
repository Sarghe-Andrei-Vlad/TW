const http = require('http');
const url = require('url');
const model = require('./model.js');

const jsonType = { "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };
const textType = { "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*", "Content-Type": "text/plain" };
const noType = { "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*" };

const fs = require('fs');
const jwt = require('jsonwebtoken');

function sendResponse(response, statusCode, message, headers = {}) {
    response.writeHead(statusCode, { ...headers });
    response.write(message);
    response.end();
}

function send500Response(response) {
    sendResponse(response, 500, "Error 500: Internal server error", textType);
}

function send404Response(response) {
    sendResponse(response, 404, "Error 404: Page not found", textType);
}

function send200Response(response) {
    sendResponse(response, 200, "Done", textType);
}

function send401Response(response) {
    sendResponse(response, 401, "Error 401: Unauthorized", textType);
}

function send403Response(response) {
    sendResponse(response, 403, "Error 403: Send valid query params", textType);
}

function createToken(user_id) {
    var payload = {
        user_id: user_id,
    };
    var privateKEY = fs.readFileSync('./private.key', 'utf8');
    var publicKEY = fs.readFileSync('./public.key', 'utf8');
    var i = 'UPNP';                   // issuer 
    var s = 'some@user.com';          // subject 
    var a = 'http://localhost';       // audience
    var signOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "12h",
        algorithm: "RS256"
    };
    var token = jwt.sign(payload, privateKEY, signOptions);
    console.log("Token - " + token);
    return token;
}

function onRequest(request, response) {

    if (request.method == 'POST' && request.url == '/login') {
        var buff = '';
        var body = '';
        request.on('data', chunk => {
            buff += chunk;
        });
        request.on('end', () => {
            body = JSON.parse(buff);
            console.log("U:" + body['username']);
            console.log("P" + body['password']);
            if (body['username'] && body['password'])
                model.login(body['username'], body['password']).then(function (resp) {
                    console.log(resp);
                    if (!resp) {
                        send403Response(response);
                    }
                    else {
                        model.getId(body['username']).then(function (user_id) {
                            let json = { "token": createToken(user_id) };
                            response.writeHead(200, jsonType);
                            response.write(JSON.stringify(json));
                            response.end();
                        }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
                    }
                }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
            else {
                send401Response(response);
            }
        });
    }
    else if (request.method == 'POST' && request.url == '/register') {
        var buff = '';
        var body = '';
        request.on('data', chunk => {
            buff += chunk;
        })
        request.on('end', () => {
            console.log("Register-" + buff);
            body = JSON.parse(buff);
            model.register(body['username'], body['password'], body['email']).then(function (message) {
                let json = { "status": message };
                console.log(json);
                response.writeHead(200, jsonType);
                response.write(JSON.stringify(json));
                response.end();
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
        })
    }
    else if (request.method == "GET" && request.url.indexOf('/getId') == 0) {
        var queryData = url.parse(request.url, true).query;
        let username = queryData.username;
        if (username && username != '')
            model.getId(username).then(function (id) {
                let json = { "id": id };
                console.log(json);
                response.writeHead(200, jsonType);
                response.write(JSON.stringify(json));
                response.end();
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
        else send403Response(response);
    }
    else if (request.method == "GET" && request.url.indexOf('/getUsername') == 0) {
        var queryData = url.parse(request.url, true).query;
        let userId = queryData.userId;
        if (userId && userId != '')
            model.getUsername(userId).then(function (username) {
                let json = { "username": username };
                console.log(json);
                response.writeHead(200, jsonType);
                response.write(JSON.stringify(json));
                response.end();
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
        else send403Response(response);
    }
    else if (request.method == 'OPTIONS') {
        console.log("Options " + request.url)
        response.writeHead(200, noType);
        response.end();
    }
    else {
        console.log(request.method + " " + request.url);
        send404Response(response);
    }
}

http.createServer(onRequest).listen(8002);
console.log("Service is running ");