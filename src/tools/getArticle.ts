import z from 'zod';
import { buildToolSchema, ToolDefinition } from './schema.js';
import { ZendeskClient } from '../zendesk-client.js';

const getArticleSchema = buildToolSchema(() => ({
    article_id: z.number().describe('The article ID to retrieve'),
}));

export type GetArticleSchema = z.infer<z.ZodObject<ReturnType<typeof getArticleSchema>>>;

export const getArticleTool = (
    zendeskClient: ZendeskClient
): ToolDefinition<ReturnType<typeof getArticleSchema>, any> => {
    return {
        name: 'get_article',
        title: 'Get Zendesk Article',
        description: 'Get an article in Zendesk Help Center by article id.',
        inputSchema: z.object(getArticleSchema()),
        handler: async (args) => {
            try {
                const data = await zendeskClient.getArticle(args);
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
