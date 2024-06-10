import './configurationMatcher';

import { describe, expect, it } from '@jest/globals';

import { getConfiguration } from '@/configuration';

describe('application configuration', () => {
    it('should be a valid configuration according to the schema', async () => {
        expect.hasAssertions();

        const { success, configuration } = await getConfiguration({ validate: false });
        expect(success).toBe(true);

        // @ts-expect-error: Ignore ts(2339)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        expect(configuration).toBeValidConfiguration();
    });
});
