import 'jest';
import './configurationMatcher';

import { describe, it } from '@jest/globals';

import { getConfiguration } from '@/configuration';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toBeValidConfiguration(): R;
        }
    }
}

describe('application configuration', () => {
    it('should be a valid configuration according to the schema', async () => {
        // eslint-disable-next-line jest/prefer-importing-jest-globals
        expect.hasAssertions();

        const configuration = await getConfiguration();

        expect(configuration).not.toStrictEqual({});
        expect(configuration).toBeValidConfiguration();
    });
});
