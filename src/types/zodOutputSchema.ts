import z from 'zod';

export const ArticleSchema = z
    .object({
        author_id: z.number().optional(),
        body: z.string().optional(),
        comments_disabled: z.boolean().optional(),
        content_tag_ids: z.array(z.number()).optional(),
        created_at: z.string().optional(),
        draft: z.boolean().optional(),
        edited_at: z.string().optional(),
        html_url: z.string().optional(),
        id: z.number().optional(),
        label_names: z.array(z.string()).optional(),
        locale: z.string(),
        outdated: z.boolean().optional(),
        outdated_locales: z.array(z.string()).optional(),
        permission_group_id: z.number(),
        position: z.number().optional(),
        promoted: z.boolean().optional(),
        section_id: z.number().optional(),
        source_locale: z.string().optional(),
        title: z.string(),
        updated_at: z.string().optional(),
        url: z.string(),
        user_segment_id: z.number().optional(),
        user_segment_ids: z.array(z.number()).optional(),
        vote_count: z.number().optional(),
        vote_sum: z.number().optional(),
    })
    .passthrough();
