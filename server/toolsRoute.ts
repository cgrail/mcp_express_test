import { Request, Response } from 'express';
import toolsService from './toolsService';

export const postTools = async (req: Request, res: Response) => {
    console.log("Post Tools: " + req.body);
    toolsService.setTools(req.body);
};

export const getTools = async (req: Request, res: Response) => {
    res.json(toolsService.getTools());
};