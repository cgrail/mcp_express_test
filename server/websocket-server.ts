import { Server } from 'http';
import { WebSocketServer } from 'ws';
import toolsService from './toolsService';
import { Tool } from './Tool';

function setupWebSocketServer(server: Server) {
    const wss = new WebSocketServer({ server });

    const getButtons: Tool = {
        type: "function",
        function: {
            name: "get_buttons",
            description: "get buttons from the current app"
        }
    };

    toolsService.setTools([getButtons]);

    wss.on('connection', (ws) => {
        console.log('New WebSocket connection');
        ws.send(JSON.stringify(getButtons));

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