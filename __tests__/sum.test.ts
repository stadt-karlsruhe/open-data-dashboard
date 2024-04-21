import { describe, expect, it, test } from '@jest/globals';
import { sum } from './sum';

describe('test suite', () => {
    it('adds 1 + 2 to equal 3', () => {
        expect.hasAssertions();
        expect(sum(1, 2)).toBe(3);
    });
});
