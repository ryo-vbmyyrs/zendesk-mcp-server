import axios, { AxiosInstance } from 'axios';
import { ListArticlesParams } from './tools/listArticles.js';
import { GetArticleSchema } from './tools/getArticle.js';
import { ListCategoriesParams } from './tools/listCategories.js';
import { ListSectionsParams } from './tools/listSections.js';
import { CreateArticleParams } from './tools/createArticle.js';
import { UpdateArticleParams } from './tools/updateArticle.js';

export interface ZendeskConfig {
    subdomain: string;
    email: string;
    apiToken: string;
    defaultLocale?: string;
}

export class ZendeskClient {
    private client: AxiosInstance;
    private defaultLocale: string;

    constructor(config: ZendeskConfig) {
        this.defaultLocale = config.defaultLocale ?? 'ja';

        // Zendesk API クライアントの初期化
        this.client = axios.create({
            baseURL: `https://${config.subdomain}/api/v2`,
            auth: {
                username: `${config.email}/token`,
                password: config.apiToken,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async getArticle(args: GetArticleSchema): Promise<any> {
        const articleId = args.article_id;

        const path = `/help_center/${this.defaultLocale}/articles/${articleId}`;

        const queryParams: Record<string, string> = {};
        return await this.makeRequest(path, queryParams, undefined, 'get');
    }

    async listArticles(args: ListArticlesParams): Promise<any> {
        const path = `/help_center/${args.locale ?? this.defaultLocale}/articles`;

        const queryParams: Record<string, string> = {};
        if (args.sort_by) {
            queryParams.sort_by = args.sort_by;
        }
        if (args.sort_order) {
            queryParams.sort_order = args.sort_order;
        }
        return await this.makeRequest(path, queryParams, undefined, 'get');
    }

    async createArticle(args: CreateArticleParams): Promise<any> {
        const path = `/help_center/sections/${args.locale ?? this.defaultLocale}/${args.section_id}/articles`;

        const article = args.article;
        // 必ず下書きとして作成する
        article.draft = true;

        return await this.makeRequest(path, {}, article, 'post');
    }

    async updateArticle(args: UpdateArticleParams): Promise<any> {
        const path = `/help_center/${args.locale ?? this.defaultLocale}/articles/${args.article_id}`;

        const article = args.article;
        // 必ず下書きとして作成する
        article.draft = true;

        return await this.makeRequest(path, {}, article, 'put');
    }

    async listCategories(args: ListCategoriesParams): Promise<any> {
        const path = `/help_center/${args.locale ?? this.defaultLocale}/categories`;

        const queryParams: Record<string, string> = {};
        if (args.sort_by) {
            queryParams.sort_by = args.sort_by;
        }
        if (args.sort_order) {
            queryParams.sort_order = args.sort_order;
        }
        return await this.makeRequest(path, queryParams, undefined, 'get');
    }

    async listSections(args: ListSectionsParams): Promise<any> {
        const path = `/help_center/${args.locale ?? this.defaultLocale}/sections`;

        const queryParams: Record<string, string> = {};
        if (args.sort_by) {
            queryParams.sort_by = args.sort_by;
        }
        if (args.sort_order) {
            queryParams.sort_order = args.sort_order;
        }
        return await this.makeRequest(path, queryParams, undefined, 'get');
    }

    private async makeRequest(
        path: string,
        queryParams: Record<string, string>,
        body: any,
        type: 'get' | 'post' | 'put'
    ): Promise<any> {
        try {
            let response;
            if (type === 'get') {
                console.error(`[ZendeskClient] Fetching data: from ${path}`);
                response = await this.client.get(path, {
                    params: queryParams,
                });
            } else if (type === 'post') {
                console.error(`[ZendeskClient] Post data: from ${path}`);
                response = await this.client.post(path, body);
            } else {
                console.error(`[ZendeskClient] Put data: from ${path}`);
                response = await this.client.put(path, body);
            }
            console.error(`[ZendeskClient] Response status: ${response.status}`);
            console.error(
                `[ZendeskClient] Response data: ${JSON.stringify(response.data, null, 2)}`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    `[ZendeskClient] Axios error:`,
                    error.response?.status,
                    error.response?.statusText
                );
                throw new Error(
                    `Zendesk API error: ${error.response?.status} - ${error.response?.statusText}`
                );
            }
            console.error(`[ZendeskClient] Unknown error:`, error);
            throw error;
        }
    }
}
