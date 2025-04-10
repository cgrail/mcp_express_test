export type Tool = {
    type: "function";
    function: {
        name: string;
        description: string;
        parameters?: {
            type: "object";
            properties: {
                [key: string]: {
                    type: string;
                    description: string;
                    enum?: string[];
                };
            };
            required: string[];
        };
    };
};