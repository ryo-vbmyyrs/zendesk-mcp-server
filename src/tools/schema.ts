import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import z from 'zod';

export type ToolDefinition<TInput extends z.ZodRawShape, TOutput extends z.ZodRawShape = any> = {
    name: string;
    title?: string;
    description: string;
    inputSchema: z.ZodObject<TInput>;
    outputSchema?: z.ZodObject<TOutput>;
    handler: (args: z.infer<z.ZodObject<TInput>>) => Promise<CallToolResult>;
};

export const buildToolSchema = <T extends z.ZodRawShape>(fn: () => T) => fn;