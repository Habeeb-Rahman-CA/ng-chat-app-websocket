const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('A user connected');

    ws.on('message', (message) => {
        console.log('received: %s', message);
        ws.send(message);
    });
});

console.log('WebSocket server running at ws://localhost:8080');