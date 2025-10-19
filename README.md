# Zendesk MCP Server

A Model Context Protocol (MCP) server that connects Zendesk with Large Language Models (LLMs). This server enables seamless integration with Claude Desktop and other MCP-compatible clients to retrieve and manipulate Zendesk Help Center articles.

## Features

- **MCP Compatible**: Fully compliant with Model Context Protocol for seamless LLM tool integration
- **TypeScript Implementation**: Type-safe implementation for reliable operation
- **Zendesk Help Center Integration**: Article retrieval and listing functionality
- **Multi-language Support**: Locale-specific article retrieval

## Currently Implemented Features

### 1. Get Article (`get_article`)

- **Description**: Retrieve a specific Zendesk Help Center article by ID
- **Parameters**:
    - `article_id` (number): The ID of the article to retrieve

### 2. List Articles (`list_articles`)

- **Description**: Retrieve a list of articles from Zendesk Help Center
- **Parameters**:
    - `locale` (string, optional): Target article locale (uses default locale if not specified)
    - `sort_by` (string, optional): Sort field (position, title, created_at, updated_at, edited_at)
    - `sort_order` (string, optional): Sort order (asc, desc)

## Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Zendesk account with API access

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd zendesk-mcp-server
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Environment Configuration**

    Set up the following environment variables:
    - **ZENDESK_SUBDOMAIN** (required): Your Zendesk subdomain (e.g., `yourcompany`)
    - **ZENDESK_EMAIL** (required): Email address for Zendesk API access
    - **ZENDESK_API_TOKEN** (required): Zendesk API token
    - **ZENDESK_DEFAULT_LOCALE** (optional): Default locale (default: `ja`)

    Create a `.env` file or set as system environment variables:

    ```bash
    # Example .env file
    ZENDESK_SUBDOMAIN=yourcompany
    ZENDESK_EMAIL=your-email@example.com
    ZENDESK_API_TOKEN=your-api-token
    ZENDESK_DEFAULT_LOCALE=ja
    ```

4. **Build the project**
    ```bash
    npm run build
    ```

### Getting Zendesk API Token

1. Log in to your Zendesk admin panel
2. Navigate to Settings → API → Zendesk API
3. Check "Token access" to enable it
4. Create a new API token and copy it

### Usage

After building, `dist/index.js` serves as the entry point. Run from MCP clients (such as Claude Desktop):

```bash
node dist/index.js
```

## Development

### Development Environment Setup

```bash
# TypeScript watch mode
npm run build -- --watch

# Development execution (using tsx)
npx tsx src/index.ts
```

### Project Structure

```
src/
├── index.ts              # Main entry point
├── zendesk-client.ts     # Zendesk API client
├── tools/                # MCP tool implementations
│   ├── allTools.ts       # Tool definition aggregator
│   ├── getArticle.ts     # Article retrieval tool
│   └── listArticles.ts   # Article listing tool
└── types/                # Type definitions
    └── zendeskApi.ts     # Zendesk API type definitions
```

## Roadmap

- Ticket operations (create, update, search)
- User management functionality
- Comment functionality
- Enhanced search and filtering capabilities
- Improved error handling

## Technologies Used

- **TypeScript**: For type-safe development
- **MCP SDK**: Model Context Protocol implementation
- **Axios**: HTTP client for Zendesk API
- **Zod**: Schema validation
- **dotenv**: Environment variable management

## Contributing

Pull requests and issues are welcome! If you have ideas for new features or improvements, please feel free to reach out.

---

**Note**: This project is in early development stage. Please thoroughly test before using in production environments.
