import {
    axisPairSchema,
    defaultFilterSchema,
    embeddedResourceSchema,
    geoJSONResourceSchema,
    jsonResourceSchema,
    resourceSchema,
} from './resourcesSchema';
import {
    carouselContentSchema,
    dashboardContentSchema,
    dashboardContentSizeSchema,
    dashboardSchema,
    dashboardsSchema,
    externalContentSchema,
    externalLinkContentSchema,
    internalLinkContentSchema,
    resourceContentSchema,
    textContentSchema,
} from './dashboardsSchema';

import { z } from 'zod';

const categoryBaseSchema = z
    .object({
        name: z.string(),
        description: z.string().optional(),
        icon: z.string().default('clipboard-data'),
        resources: z.array(z.string()).optional(),
    })
    .strict();

const categorySchema = categoryBaseSchema
    .extend({
        subcategories: z.array(categoryBaseSchema).optional(),
    })
    .strict();

export const categoriesSchema = z.array(categorySchema);

export const appearanceSchema = z
    .object({
        theme: z.union([z.literal('bootstrap-light'), z.literal('karlsruhe')]).default('bootstrap-light'),
    })
    .strict();

export const configurationSchema = z
    .object({
        resources: z.array(resourceSchema),
        appearance: appearanceSchema,
        categories: categoriesSchema,
        dashboards: dashboardsSchema,
    })
    .strict();

export type EmbeddedResource = z.infer<typeof embeddedResourceSchema>;
export type JSONResource = z.infer<typeof jsonResourceSchema>;
export type GeoJSONResource = z.infer<typeof geoJSONResourceSchema>;
export type AxisPair = z.infer<typeof axisPairSchema>;
export type Filter = z.infer<typeof defaultFilterSchema>;
export type Resource = z.infer<typeof resourceSchema>;

export type Category = z.infer<typeof categorySchema>;

export type DashboardContentSize = z.infer<typeof dashboardContentSizeSchema>;
export type DashboardContent = z.infer<typeof dashboardContentSchema>;
export type DashboardResourceContent = z.infer<typeof resourceContentSchema>;
export type DashboardTextContent = z.infer<typeof textContentSchema>;
export type DashboardCarouselContent = z.infer<typeof carouselContentSchema>;
export type DashboardExternalContent = z.infer<typeof externalContentSchema>;
export type DashboardResourceLinkContent = z.infer<typeof internalLinkContentSchema>;
export type DashboardExternalLinkContent = z.infer<typeof externalLinkContentSchema>;
export type Dashboard = z.infer<typeof dashboardSchema>;

export type Appearance = z.infer<typeof appearanceSchema>;

export type Configuration = z.infer<typeof configurationSchema>;
