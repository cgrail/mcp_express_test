import ollama from 'ollama';
import { Request, Response } from 'express';
import { llmModel } from '../config';

const ollamaChatRequest = async (req: Request, res: Response) => {
    const response = await ollama.chat({
        model: llmModel,
        messages: [{ role: 'user', content: req.body.query }],
    });
    res.send(response.message);
}

export default ollamaChatRequest;