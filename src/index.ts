import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ZendeskClient } from './zendesk-client.js';
import { getAllTools } from './tools/allTools.js';

class ZendeskMcpServer {
    private server: McpServer;
    private zendeskClient: ZendeskClient;

    constructor() {
        this.server = new McpServer({
            name: 'zendesk-mcp-server',
            version: '0.1.0',
        });

        // 環境変数から認証情報を取得
        const subdomain = process.env.ZENDESK_SUBDOMAIN || '';
        const email = process.env.ZENDESK_EMAIL || '';
        const apiToken = process.env.ZENDESK_API_TOKEN || '';

        // 必須パラメータのチェック
        if (!subdomain || !email || !apiToken) {
            throw new Error(
                'Required environment variables are missing: ZENDESK_SUBDOMAIN, ZENDESK_EMAIL, ZENDESK_API_TOKEN'
            );
        }

        this.zendeskClient = new ZendeskClient({
            subdomain,
            email,
            apiToken,
            defaultLocale: process.env.ZENDESK_DEFAULT_LOCALE,
        });

        this.setupHandlers();
    }

    private setupHandlers(): void {
        const allTools = getAllTools(this.zendeskClient);
        for (const tool of allTools) {
            this.server.registerTool(
                tool.name,
                {
                    title: tool.title ?? tool.name,
                    description: tool.description,
                    inputSchema: tool.inputSchema.shape,
                },
                tool.handler
            );
        }
    }

    async run(): Promise<void> {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Zendesk MCP Server running on stdio');
    }
}

async function main() {
    try {
        const server = new ZendeskMcpServer();
        await server.run();
    } catch (error) {
        console.error('Failed to start Zendesk MCP Server:', error);
        process.exit(1);
    }
}

main();
