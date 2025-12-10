# n8n-nodes-hackclub-embedding

This is an n8n community node. It lets you use Hackclub AI embeddings in your n8n workflows.

Hackclub AI is a free AI service that provides access to various embedding models for generating vector embeddings from text. These embeddings can be used for semantic search, clustering, or storing in vector databases like Pinecone or pgvector.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node provides embedding generation capabilities:

- **Generate Embeddings**: Convert text into vector embeddings using Hackclub AI's embedding models
- **Batch Processing**: Automatically batches large amounts of text for efficient processing
- **Model Selection**: Choose from available embedding models dynamically loaded from the API

## Credentials

To use this node, you need:

1. A Hackclub AI account - Sign up at [Hackclub AI](https://ai.hackclub.com/)
2. An API key from your Hackclub AI dashboard

### Setting up credentials in n8n:

1. In n8n, go to **Credentials** → **New**
2. Search for "Hackclub Embedding API"
3. Enter your API key
4. (Optional) Customize the API URL if using a different endpoint
5. Click **Test** to verify the connection
6. Save the credentials

## Compatibility

- Minimum n8n version: 1.0.0
- Tested with n8n version: 1.x
- Compatible with n8n AI nodes and LangChain integration

## Usage

1. Add the **Hackclub Embedding** node to your workflow
2. Connect your Hackclub Embedding API credentials
3. Select an embedding model from the dropdown
4. Configure options:
   - **Batch Size**: Maximum documents per request (default: 512, max: 2048)
   - **Strip New Lines**: Whether to remove line breaks from input text (default: true)
5. Connect the output to n8n AI nodes like Vector Store, Retriever, or other LangChain components

### Use Cases

- Building semantic search functionality
- Creating chatbots with context awareness
- Clustering similar documents
- Recommendation systems
- Content similarity detection

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Hackclub AI Documentation](https://docs.ai.hackclub.com/)
* [Hackclub AI Embeddings API](https://docs.ai.hackclub.com/api/embeddings.html)
* [GitHub Repository](https://github.com/abdessattar23/n8n-nodes-hackclub-embedding)

## Version history

### 0.1.1
- Fixed models endpoint to use `/embeddings/models` instead of `/models`
- Implemented stripNewLines functionality
- Updated credentials test endpoint
- Improved documentation
