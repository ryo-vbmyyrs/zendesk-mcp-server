import z from 'zod';
import { buildToolSchema, ToolDefinition } from './schema.js';
import { ZendeskClient } from '../zendesk-client.js';

const listCategoriesSchema = buildToolSchema(() => ({
    locale: z
        .string()
        .optional()
        .describe('Locale of target articles. If not specified, default locale is used.'),
    sort_by: z.enum(['position', 'created_at', 'updated_at']).optional().describe('Sort field'),
    sort_order: z.enum(['asc', 'desc']).optional().describe('Sort order'),
}));

export type ListCategoriesParams = z.infer<z.ZodObject<ReturnType<typeof listCategoriesSchema>>>;

export const listCategoriesTool = (
    zendeskClient: ZendeskClient
): ToolDefinition<ReturnType<typeof listCategoriesSchema>, any> => {
    return {
        name: 'list_categories',
        title: 'List Zendesk Categories',
        description:
            'List categories in Zendesk Help Center. Categories are the top-level organizing containers of the knowledge base in the help center.',
        inputSchema: z.object(listCategoriesSchema()),
        handler: async (args) => {
            try {
                const data = await zendeskClient.listCategories(args);
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
                            text: `Categories retrieval error: ${error}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    };
};
