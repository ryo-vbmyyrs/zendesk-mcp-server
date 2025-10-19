import { ZendeskClient } from '../zendesk-client.js';
import { ToolDefinition } from './schema.js';
import { getArticleTool } from './getArticle.js';
import { listArticlesTool } from './listArticles.js';
import { listCategoriesTool } from './listCategories.js';
import { listSectionsTool } from './listSections.js';
import { createArticleTool } from './createArticle.js';
import { updateArticleTool } from './updateArticle.js';

export const getAllTools = (zendeskClient: ZendeskClient): ToolDefinition<any, any>[] => {
    return [
        getArticleTool(zendeskClient),
        listArticlesTool(zendeskClient),
        createArticleTool(zendeskClient),
        updateArticleTool(zendeskClient),
        listCategoriesTool(zendeskClient),
        listSectionsTool(zendeskClient),
    ];
};
