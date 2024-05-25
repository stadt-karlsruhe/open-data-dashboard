import { describe, expect, it } from '@jest/globals';
import { getColor } from '@/colors';

describe('colors', () => {
  it('should return a valid color for index-arguments from 0 to 99', () => {
    expect.hasAssertions();
    for (let i = 0; i <= 100; i++) {
      const color = getColor(i);
      expect(color).not.toHaveLength(0);
    }
  });
});
