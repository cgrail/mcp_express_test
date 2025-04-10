import express from 'express';
import bodyParser from 'body-parser';

import setupWebSocketServer from './server/websocket-server';
import ollamaChatRequest from './server/ollama-route';
import toolsService from './server/toolsService';
import { port } from './config';

const app = express();
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.use(bodyParser.json());
app.use(express.static('webapp'));
app.post('/api/request', ollamaChatRequest);
setupWebSocketServer(server);
app.get('/tools', (req, res) => {
    res.json(toolsService.getTools());
});