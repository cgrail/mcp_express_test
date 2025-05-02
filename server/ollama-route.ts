import { Request, Response } from 'express';
import { ChatManager } from './ChatManager';

const chat = new ChatManager();
chat.initialize();

const ollamaChatRequest = async (req: Request, res: Response) => {
    try {
        const response = await chat.handleMessage(req.body.query);
        res.send({
            content: response
        });
    } catch (error) {
        console.error('Error in ollamaChatRequest:', error);
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
}

export default ollamaChatRequest;