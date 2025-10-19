import z from 'zod';
import { buildToolSchema, ToolDefinition } from './schema.js';
import { ZendeskClient } from '../zendesk-client.js';

const listSectionsSchema = buildToolSchema(() => ({
    locale: z
        .string()
        .optional()
        .describe('Locale of target articles. If not specified, default locale is used.'),
    sort_by: z.enum(['position', 'created_at', 'updated_at']).optional().describe('Sort field'),
    sort_order: z.enum(['asc', 'desc']).optional().describe('Sort order'),
}));

export type ListSectionsParams = z.infer<z.ZodObject<ReturnType<typeof listSectionsSchema>>>;

export const listSectionsTool = (
    zendeskClient: ZendeskClient
): ToolDefinition<ReturnType<typeof listSectionsSchema>, any> => {
    return {
        name: 'list_sections',
        title: 'List Zendesk Sections',
        description: 'List sections in Zendesk Help Center. Sections contain related articles.',
        inputSchema: z.object(listSectionsSchema()),
        handler: async (args) => {
            try {
                const data = await zendeskClient.listSections(args);
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
                            text: `Sections retrieval error: ${error}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    };
};
