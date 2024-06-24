import './configurationMatcher';

import { expect as _expect, describe, it } from '@jest/globals';

import { getConfiguration } from '@/configuration';

interface CustomMatchers<R> {
    toBeValidConfiguration(): R;
}

const expect = _expect as unknown as (<T = unknown>(actual: T) => CustomMatchers<void> & ReturnType<typeof _expect>) &
    typeof _expect;

describe('application configuration', () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    it('should be a valid configuration according to the schema', async () => {
        expect.hasAssertions();

        const configuration = await getConfiguration();

        expect(configuration).not.toStrictEqual({});
        expect(configuration).toBeValidConfiguration();
    });
});
