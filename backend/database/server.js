const http = require('http');
const url = require('url');
const controller = require('../user_management/controller.js');

const noType = { "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS", "Access-Control-Allow-Credentials": true, "Access-Control-Allow-Headers": "authorization,content-type", "Access-Control-Allow-Origin": "*" };

function onRequest(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Headers', 'authorization,content-type');

    const reqUrl = url.parse(request.url, true);

    if (request.method === 'POST' && reqUrl.pathname === '/login') {
        controller.handleLogin(request, response);
    } else if (request.method === 'POST' && reqUrl.pathname === '/register') {
        controller.handleRegister(request, response);
    } else if (request.method === 'POST' && reqUrl.pathname === '/logout') {
        controller.handleLogout(request, response);
    } else if (request.method === 'GET' && reqUrl.pathname.startsWith('/getId')) {
        controller.handleGetId(request, response);
    } else if (request.method === 'GET' && reqUrl.pathname.startsWith('/getUsername')) {
        controller.handleGetUsername(request, response);
    } else if (request.method === 'GET' && reqUrl.pathname.startsWith('/images')) {
        controller.handleFetchImages(request, response);
    } else if (request.method === 'OPTIONS') {
        response.writeHead(200, noType);
        response.end();
    } else {
        controller.send404Response(response);
    }
}

http.createServer(onRequest).listen(8001);
console.log("Service is running at http://127.0.0.1:8001");