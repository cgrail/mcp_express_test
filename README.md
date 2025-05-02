# MCP Express App Test

This app demonstrates how an app can be controlled via the MCP protocol. The example is a little bit artificial as for the currrent example it would be far easier to just use plain function calling tools.
https://platform.openai.com/docs/guides/function-calling

![Simple MCP Example](docs/architecture.drawio.svg)

## How to run it locally

- Download this repo
- Download and install nodejs
- Download and install [Ollama](https://ollama.com)
- Start Ollama and run the GWEN3 model: `ollama run qwen3:latest`
- install all dependencies using `npm install`
- start the app using `nmp start`
- Open your browser and access http://localhost:3000/
- Enter a command like `press blue button` or `drücke blauer knopf`