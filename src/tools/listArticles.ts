import z from 'zod';
import { buildToolSchema, ToolDefinition } from './schema.js';
import { ZendeskClient } from '../zendesk-client.js';

const listArticlesSchema = buildToolSchema(() => ({
    locale: z
        .string()
        .optional()
        .describe('Locale of target articles. If not specified, default locale is used.'),
    sort_by: z
        .enum(['position', 'title', 'created_at', 'updated_at', 'edited_at'])
        .optional()
        .describe('Sort field'),
    sort_order: z.enum(['asc', 'desc']).optional().describe('Sort order'),
}));

export type ListArticlesParams = z.infer<z.ZodObject<ReturnType<typeof listArticlesSchema>>>;

export const listArticlesTool = (
    zendeskClient: ZendeskClient
): ToolDefinition<ReturnType<typeof listArticlesSchema>, any> => {
    return {
        name: 'list_articles',
        title: 'List Zendesk Articles',
        description: 'List articles in Zendesk Help Center',
        inputSchema: z.object(listArticlesSchema()),
        handler: async (args) => {
            try {
                const data = await zendeskClient.listArticles(args);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(data, null, 2),
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Article retrieval error: ${error}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    };
};
