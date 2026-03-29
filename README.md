# Ollite

A minimalist, single-file web interface for Ollama.

## Features

- **Zero dependencies**: Just one HTML file.
- **Real-time streaming**: Watch the model generate responses token by token.
- **URL-based persistence**: Conversation history is stored in the URL, making it easy to bookmark or share.
- **Minimalist Design**: Sleek black/monospace interface.
- **Message Management**:
  - **C (Copy)**: Copy message content to clipboard.
  - **D (Delete)**: Remove a message from the conversation.
  - **E (Edit)**: Load a message back into the input for modification.
  - **Double click on message**: Copy message content to clipboard.

## Getting Started

1. Make sure [Ollama](https://ollama.com/) is running and accessible (default: `http://localhost:11434`).
2. Open `index.html` in any modern web browser.
3. Select your model and start chatting.

### Configuration

You can pass configuration via URL query parameters:
- `apiHost`: The Ollama API host (default `${location.protocol}://${location.hostname}:11434`).
- `model`: The model name to use.
- `history`: The conversation history. (use ||| to separate messages)
- `config`: JSON string of the config. (default `{}`, apply to fetch body)

## License

MIT License
