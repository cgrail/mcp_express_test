import { Request, Response } from 'express';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

import { z } from "zod";

const server = new McpServer({
    name: 'json-response-streamable-http-server',
    version: '1.0.0',
}, {
    capabilities: {
        logging: {}
    }
});

server.tool("add",
    "add two numbers",
    { a: z.number(), b: z.number() },
    async ({ a, b }) => ({
        content: [{ type: "text", text: String(a + b) }]
    })
);

server.tool(
    "get-button-ids",
    "receive a list with all button ids of the current UI",
    {},
    async ({ }) => {
        return {
            content: [{ type: "text", text: "blue-button: blue button\nred-button: red button" }]
        };
    }
);

server.tool(
    "press-button",
    "press a button on the UI with a given button id. The button id can be received using the get-button-ids tool",
    { buttonId: z.string() },
    async ({ buttonId }) => {
        return {
            content: [{ type: "text", text: "Button pressed" + buttonId }]
        };
    }
);


const transports: { [sessionId: string]: SSEServerTransport } = {};

export const sseGet = async (req: Request, res: Response) => {
    const transport = new SSEServerTransport('/mcp/messages', res);
    transports[transport.sessionId] = transport;
    res.on("close", () => {
        delete transports[transport.sessionId];
    });
    await server.connect(transport);
};

export const messagesPost = async (req: Request, res: Response) => {
    const sessionId = req.query.sessionId as string;
    const transport = transports[sessionId];
    if (transport) {
        await transport.handlePostMessage(req, res);
    } else {
        res.status(400).send('No transport found for sessionId');
    }
};
