import { Tool } from "./Tool";

class ToolsService {
    private tools: Tool[] = [];

    setTools(tools: Tool[]): void {
        this.tools = tools;
    }

    getTools(): Tool[] {
        return this.tools;
    }
}

 export default new ToolsService();