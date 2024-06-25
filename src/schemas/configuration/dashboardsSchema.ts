import { z } from 'zod';

export const dashboardContentSizeSchema = z
    .union([z.literal('L'), z.literal('M'), z.literal('S'), z.literal('XS')])
    .default('M');

export const resourceContentSchema = z
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

export const externalLinkContentSchema = z
    .object({
        type: z.literal('LINK_EXTERNAL'),
        target: z.string().url(),
        text: z.string(),
        icon: z.string().optional(),
        color: z.string().optional(),
        backgroundColor: z.string().optional(),
    })
    .strict();

export const internalLinkContentSchema = z
    .object({
        type: z.literal('LINK_INTERNAL'),
        uniqueIdentifier: z.string(),
        linkedType: z.union([
            z.literal('dashboard'),
            z.literal('category'),
            z.literal('subcategory'),
            z.literal('resource'),
        ]),
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

export const linkContentSchema = z.union([internalLinkContentSchema, externalLinkContentSchema]);

export const textContentSchema = z
    .object({
        type: z.literal('TEXT'),
        size: dashboardContentSizeSchema,
        header: z.string(),
        body: z.string().optional(),
    })
    .strict();

export const carouselContentSchema = z.object({
    type: z.literal('TEXT_CAROUSEL'),
    size: dashboardContentSizeSchema,
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    slides: z
        .object({
            title: z.string(),
            text: z.string(),
            color: z.string().optional(),
            backgroundColor: z.string().optional(),
        })
        .strict()
        .array(),
});

export const externalContentSchema = z
    .object({
        type: z.literal('EXTERNAL'),
        name: z.string(),
        source: z.string().url(),
        size: dashboardContentSizeSchema,
    })
    .strict();

export const dashboardContentSchema = z.union([
    resourceContentSchema,
    textContentSchema,
    carouselContentSchema,
    linkContentSchema,
    externalContentSchema,
]);

export const dashboardSchema = z
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
