import '@testing-library/jest-dom/jest-globals';

import { TextDecoder, TextEncoder } from 'node:util';

import { ReadonlyURLSearchParams } from 'next/navigation';

// Global mocks

jest.mock<typeof import('next/navigation')>('next/navigation', () => {
  const actual = jest.requireActual<typeof import('next/navigation')>('next/navigation');
  return {
    ...actual,
    usePathname: () => '',
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
    }),
    useSearchParams: () =>
      ({
        // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
        get: () => {},
      }) as unknown as ReadonlyURLSearchParams,
  };
});

global.TextEncoder = TextEncoder;
// @ts-expect-error Can be ignored as it only serves the purpose of mocking react-leaflet
global.TextDecoder = TextDecoder;
