import {
    DashboardCarouselContent,
    DashboardExternalContent,
    DashboardResourceContent,
    DashboardTextContent,
} from '@/schemas/configuration/configurationSchema';

export const mockExternalContent: DashboardExternalContent = {
    type: 'EXTERNAL',
    name: 'test',
    source: 'test',
    size: 'M',
};

export const mockTextContent: DashboardTextContent = {
    type: 'TEXT',
    header: 'test',
    size: 'M',
};

export const mockCarouselContent: DashboardCarouselContent = {
    type: 'TEXT_CAROUSEL',
    size: 'M',
    slides: [
        {
            title: 'test',
            text: 'test',
        },
    ],
};

export const mockResourceContent: DashboardResourceContent = {
    type: 'RESOURCE',
    resourceId: '1',
    size: 'M',
};
