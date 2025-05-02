import { Server } from 'http';
import { WebSocketServer } from 'ws';

function setupWebSocketServer(server: Server) {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log('New WebSocket connection');

        ws.on('message', (message) => {
            console.log(`Received: ${message}`);
            ws.send(`Echo: ${message}`);
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });
}

export default setupWebSocketServer;