import { describe, expect, it } from '@jest/globals';
import { getColor } from '@/colors';

const cssVariableRegex = /var\(--[a-zA-Z0-9-]+\)/u;

describe('colors', () => {
    it('should return a CSS variable expression for index-arguments from 0 to 99', () => {
        expect.hasAssertions();
        for (let i = 0; i < 100; i++) {
            const color = getColor(i);
            expect(color).not.toHaveLength(0);
            expect(color).toMatch(cssVariableRegex);
        }
    });
});
