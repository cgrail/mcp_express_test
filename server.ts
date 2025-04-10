import express from 'express';
import bodyParser from 'body-parser';

import ollamaChatRequest from './routes/ollama-route';

const app = express();
const PORT = 3000;


app.use(bodyParser.json());

app.use(express.static('webapp'));

app.post('/api/request', ollamaChatRequest);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});