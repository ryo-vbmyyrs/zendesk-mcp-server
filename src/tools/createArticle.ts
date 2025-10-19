import z from 'zod';
import { buildToolSchema, ToolDefinition } from './schema.js';
import { ZendeskClient } from '../zendesk-client.js';
import { ArticleSchema } from '../types/zodOutputSchema.js';

const createArticleSchema = buildToolSchema(() => ({
    locale: z
        .string()
        .optional()
        .describe('Locale of target articles. If not specified, default locale is used.'),
    section_id: z.number().describe('The unique ID of the section.'),
    article: ArticleSchema,
}));

export type CreateArticleParams = z.infer<z.ZodObject<ReturnType<typeof createArticleSchema>>>;

export const createArticleTool = (
    zendeskClient: ZendeskClient
): ToolDefinition<ReturnType<typeof createArticleSchema>, any> => {
    return {
        name: 'create_article',
        title: 'Create Zendesk Article',
        description: 'Create a draft article in the specified section in Zendesk Help Center.',
        inputSchema: z.object(createArticleSchema()),
        handler: async (args) => {
            try {
                const data = await zendeskClient.createArticle(args);
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
                            text: `Article creation error: ${error}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    };
};
