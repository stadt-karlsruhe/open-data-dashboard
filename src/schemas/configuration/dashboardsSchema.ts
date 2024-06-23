import { z } from 'zod';

const dashboardContentSizeSchema = z
    .union([z.literal('L'), z.literal('M'), z.literal('S'), z.literal('XS')])
    .default('M');

const resourceContentSchema = z
    .object({
        type: z.literal('RESOURCE'),
        resourceId: z.string(),
        size: dashboardContentSizeSchema,
        overrides: z
            .object({
                name: z.string().optional(),
                description: z.string().optional(),
            })
            .strict()
            .optional(),
    })
    .strict();

const externalLinkContentSchema = z
    .object({
        type: z.literal('LINK_EXTERNAL'),
        target: z.string().url(),
        text: z.string(),
        icon: z.string().optional(),
        color: z.string().optional(),
        backgroundColor: z.string().optional(),
    })
    .strict();

const resourceLinkContentSchema = z
    .object({
        type: z.literal('LINK_INTERNAL'),
        uniqueIdentifier: z.string(),
        kind: z.union([z.literal('dashboard'), z.literal('category'), z.literal('subcategory'), z.literal('resource')]),
        size: dashboardContentSizeSchema,
        overrides: z
            .object({
                name: z.string().optional(),
                description: z.string().optional(),
            })
            .strict()
            .optional(),
    })
    .strict();

const linkContentSchema = z.union([resourceLinkContentSchema, externalLinkContentSchema]);

const textContentSchema = z
    .object({
        type: z.literal('TEXT'),
        size: dashboardContentSizeSchema,
        header: z.string(),
        body: z.string().optional(),
    })
    .strict();

const externalContentSchema = z
    .object({
        type: z.literal('EXTERNAL'),
        name: z.string(),
        source: z.string().url(),
        size: dashboardContentSizeSchema,
    })
    .strict();

const dashboardContentSchema = z.union([
    resourceContentSchema,
    textContentSchema,
    linkContentSchema,
    externalContentSchema,
]);

const dashboardSchema = z
    .object({
        id: z.string(),
        name: z.string(),
        icon: z.string().default('clipboard-data'),
        description: z.string().optional(),
        contents: z.array(z.array(z.union([dashboardContentSchema, z.array(dashboardContentSchema)]))).optional(),
    })
    .strict();

export const dashboardsSchema = z
    .array(dashboardSchema)
    .refine((dashboards) => dashboards.some((dashboard) => dashboard.id === 'homepage'), {
        message: 'The homepage must be configured.',
    });

export type DashboardContentSize = z.infer<typeof dashboardContentSizeSchema>;
export type Dashboard = z.infer<typeof dashboardSchema>;
export type DashboardContent = z.infer<typeof dashboardContentSchema>;
export type DashboardResourceContent = z.infer<typeof resourceContentSchema>;
export type DashboardTextContent = z.infer<typeof textContentSchema>;
export type DashboardExternalContent = z.infer<typeof externalContentSchema>;
export type DashboardResourceLinkContent = z.infer<typeof resourceLinkContentSchema>;
export type DashboardExternalLinkContent = z.infer<typeof externalLinkContentSchema>;
