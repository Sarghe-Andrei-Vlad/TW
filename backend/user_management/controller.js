const url = require('url');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const path = require('path');
const model = require('./model.js');

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
    const payload = { user_id: user_id };
    const privateKeyPath = path.join(__dirname, 'private.key');
    const publicKeyPath = path.join(__dirname, 'public.key');
    const privateKEY = fs.readFileSync(privateKeyPath, 'utf8');
    const signOptions = {
        issuer: 'UPNP',
        subject: 'some@user.com',
        audience: 'http://localhost',
        expiresIn: "12h",
        algorithm: "RS256"
    };
    const token = jwt.sign(payload, privateKEY, signOptions);
    console.log("Token - " + token);
    return token;
}

async function handleLogin(request, response) {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', async () => {
        body = JSON.parse(body);
        console.log('Received login request:', body);
        if (body['username'] && body['password']) {
            try {
                const resp = await model.login(body['username'], body['password']);
                if (!resp) {
                    send403Response(response);
                } else {
                    try {
                        const user_id = await model.getId(body['username']);
                        let json = { "token": createToken(user_id) };
                        response.writeHead(200, jsonType);
                        response.write(JSON.stringify(json));
                        response.end();
                    } catch (err) {
                        send500Response(response);
                        console.log(err);
                    }
                }
            } catch (err) {
                send500Response(response);
                console.log(err);
            }
        } else {
            send401Response(response);
        }
    });
}

async function handleLogout(request, response) {
    let body = '';
    request.on('data', chunk => { 
        console.log('Receiving chunk:', chunk); // Log each chunk received
        body += chunk; 
    });
    
    request.on('end', () => {
        try {
            console.log('Complete body received:', body); // Log the complete body received
            if (body) {
                body = JSON.parse(body);
                const token = body.token;
                if (!token) {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify({ error: 'Token is required for logout' }));
                    response.end();
                    return;
                }
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify({ message: 'Logout successful' }));
                response.end();
            } else {
                throw new Error('No body data received');
            }
        } catch (err) {
            console.error('Error during logout:', err);
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ error: 'Internal Server Error' }));
            response.end();
        }
    });
}


async function handleRegister(request, response) {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', async () => {
        body = JSON.parse(body);
        console.log('Received register request:', body);
        try {
            const message = await model.register(body['username'], body['password'], body['email']);
            let json = { "status": message };
            response.writeHead(200, jsonType);
            response.write(JSON.stringify(json));
            response.end();
        } catch (err) {
            send500Response(response);
            console.log(err);
        }
    });
}

async function handleGetId(request, response) {
    const queryData = url.parse(request.url, true).query;
    let username = queryData.username;
    console.log('Received getId request for username:', username);
    if (username && username !== '') {
        try {
            const id = await model.getId(username);
            let json = { "id": id };
            response.writeHead(200, jsonType);
            response.write(JSON.stringify(json));
            response.end();
        } catch (err) {
            send500Response(response);
            console.log(err);
        }
    } else {
        send403Response(response);
    }
}

async function handleGetUsername(request, response) {
    const queryData = url.parse(request.url, true).query;
    let userId = queryData.userId;
    console.log('Received getUsername request for userId:', userId);
    if (userId && userId !== '') {
        try {
            const username = await model.getUsername(userId);
            let json = { "username": username };
            response.writeHead(200, jsonType);
            response.write(JSON.stringify(json));
            response.end();
        } catch (err) {
            send500Response(response);
            console.log(err);
        }
    } else {
        send403Response(response);
    }
}

async function handleFetchImages(request, response) {
    const reqUrl = url.parse(request.url, true);
    console.log('Received fetchImages request:', reqUrl);
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

module.exports = {
    handleLogin,
    handleLogout,
    handleRegister,
    handleGetId,
    handleGetUsername,
    handleFetchImages,
    send404Response,
    send403Response,
    send401Response,
    send500Response
};