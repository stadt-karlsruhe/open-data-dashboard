import './configurationMatcher';

import { describe, expect, it } from '@jest/globals';

import { Resource } from '@/schemas/configuration-schema';
import { getConfiguration } from '@/configuration';

const endpoints = ['https://web6.karlsruhe.de/sndadadadadadadad', 'https://web6.karlsruhe.de'];

describe('application configuration endpoints', () => {
    let resources: Resource[] = [];
    beforeAll(async () => {
        const configuration = await getConfiguration();
        resources = configuration.data?.resources;
      })
    resources.forEach((resource) => {
        test('should test config', async () => {
            expect(resource.id).toBe("Hello");
        })
    })
});
