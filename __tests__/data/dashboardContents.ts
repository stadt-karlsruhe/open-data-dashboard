import {
    DashboardCarouselContent,
    DashboardExternalContent,
    DashboardExternalLinkContent,
    DashboardInternalLinkContent,
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
            title: 'slide1',
            text: 'slideText1',
        },
    ],
};

export const mockResourceContent: DashboardResourceContent = {
    type: 'RESOURCE',
    resourceId: '1',
    size: 'M',
};

export const mockInternalLinkContentResource: DashboardInternalLinkContent = {
    type: 'LINK_INTERNAL',
    linkedType: 'resource',
    uniqueIdentifier: '1',
    size: 'M',
};

export const mockInternalLinkContentDashboard: DashboardInternalLinkContent = {
    type: 'LINK_INTERNAL',
    linkedType: 'dashboard',
    uniqueIdentifier: '1',
    size: 'M',
};

export const mockInternalLinkContentCategory: DashboardInternalLinkContent = {
    type: 'LINK_INTERNAL',
    linkedType: 'category',
    uniqueIdentifier: 'Gesellschaft',
    size: 'M',
};

export const mockInternalLinkContentSubcategory: DashboardInternalLinkContent = {
    type: 'LINK_INTERNAL',
    linkedType: 'subcategory',
    uniqueIdentifier: 'Politik',
    size: 'M',
};

export const mockExternalLinkContent: DashboardExternalLinkContent = {
    type: 'LINK_EXTERNAL',
    text: 'test',
    target: 'test',
};
