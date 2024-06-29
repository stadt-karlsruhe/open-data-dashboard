import '@testing-library/jest-dom/jest-globals';

import { ReadonlyURLSearchParams, RedirectType } from 'next/navigation';
import { TextDecoder, TextEncoder } from 'node:util';

// Global mocks

jest.mock<typeof import('next/navigation')>('next/navigation', () => {
  const actual = jest.requireActual<typeof import('next/navigation')>('next/navigation');
  return {
    ...actual,
    usePathname: jest.fn(),
    redirect: jest.fn() as unknown as (u: string, t?: RedirectType) => never,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
    }),
    notFound: jest.fn() as unknown as () => never,
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

// eslint-disable-next-line jest/prefer-spy-on
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
