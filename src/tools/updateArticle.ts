import z from 'zod';
import { buildToolSchema, ToolDefinition } from './schema.js';
import { ZendeskClient } from '../zendesk-client.js';
import { ArticleSchema } from '../types/zodOutputSchema.js';

const updateArticleSchema = buildToolSchema(() => ({
    locale: z
        .string()
        .optional()
        .describe('Locale of target articles. If not specified, default locale is used.'),
    article_id: z.number().describe('The unique ID of the article.'),
    article: ArticleSchema.describe('Detail of article to update.'),
}));

export type UpdateArticleParams = z.infer<z.ZodObject<ReturnType<typeof updateArticleSchema>>>;

export const updateArticleTool = (
    zendeskClient: ZendeskClient
): ToolDefinition<ReturnType<typeof updateArticleSchema>, any> => {
    return {
        name: 'update_article',
        title: 'Update Zendesk Article',
        description: 'Update a draft article in Zendesk Help Center.',
        inputSchema: z.object(updateArticleSchema()),
        handler: async (args) => {
            try {
                const data = await zendeskClient.updateArticle(args);
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
                            text: `Article update error: ${error}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    };
};
