const http = require('http');
const url = require('url');
const mysql = require('mysql2');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fosa_database'
});

const itemsPerPage = 6;

pool.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        pool.end();
        pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'fosa_database'
        });
    } else {
        throw err;
    }
});

const jsonType = { "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };
const textType = { "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*", "Content-Type": "text/plain" };
const noType = { "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*" };

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

function send401Response(response) {
    sendResponse(response, 401, "Error 401: Unauthorized", textType);
}

function send403Response(response) {
    sendResponse(response, 403, "Error 403: Send valid query params", textType);
}

function createToken(user_id) {
    var payload = { user_id: user_id };
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

async function handleLogin(request, response) {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', () => {
        body = JSON.parse(body);
        if (body['username'] && body['password']) {
            model.login(body['username'], body['password']).then(function (resp) {
                if (!resp) {
                    send403Response(response);
                } else {
                    model.getId(body['username']).then(function (user_id) {
                        let json = { "token": createToken(user_id) };
                        response.writeHead(200, jsonType);
                        response.write(JSON.stringify(json));
                        response.end();
                    }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
                }
            }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
        } else {
            send401Response(response);
        }
    });
}

async function handleRegister(request, response) {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', () => {
        body = JSON.parse(body);
        model.register(body['username'], body['password'], body['email']).then(function (message) {
            let json = { "status": message };
            response.writeHead(200, jsonType);
            response.write(JSON.stringify(json));
            response.end();
        }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
    });
}

async function handleGetId(request, response) {
    const queryData = url.parse(request.url, true).query;
    let username = queryData.username;
    if (username && username !== '') {
        model.getId(username).then(function (id) {
            let json = { "id": id };
            response.writeHead(200, jsonType);
            response.write(JSON.stringify(json));
            response.end();
        }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
    } else {
        send403Response(response);
    }
}

async function handleGetUsername(request, response) {
    const queryData = url.parse(request.url, true).query;
    let userId = queryData.userId;
    if (userId && userId !== '') {
        model.getUsername(userId).then(function (username) {
            let json = { "username": username };
            response.writeHead(200, jsonType);
            response.write(JSON.stringify(json));
            response.end();
        }).catch((err) => setImmediate(() => { send500Response(response); console.log(err); }));
    } else {
        send403Response(response);
    }
}

async function handleFetchImages(request, response) {
    const reqUrl = url.parse(request.url, true);
    console.log(reqUrl);
    const page = parseInt(reqUrl.query.page) || 1;
    const offset = (page - 1) * itemsPerPage;

    pool.query(`SELECT image_url FROM Footwear ORDER BY RAND() LIMIT ?, ?`, [offset, itemsPerPage], (err, results) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Internal Server Error' }));
            console.error(err);
            return;
        }

        console.log('Fetched image URLs:', results);

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(results));
    });
}

function onRequest(request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Headers', 'authorization,content-type');

    if (request.method === 'POST' && request.url === '/login') {
        handleLogin(request, response);
    } else if (request.method === 'POST' && request.url === '/register') {
        handleRegister(request, response);
    } else if (request.method === 'GET' && request.url.startsWith('/getId')) {
        handleGetId(request, response);
    } else if (request.method === 'GET' && request.url.startsWith('/getUsername')) {
        handleGetUsername(request, response);
    } else if (request.method === 'GET' && request.url.startsWith('/images')) {
        handleFetchImages(request, response);
    } else if (request.method === 'OPTIONS') {
        response.writeHead(200, noType);
        response.end();
    } else {
        send404Response(response);
    }
}

http.createServer(onRequest).listen(8001);
console.log("Service is running at http://127.0.0.1:8001");