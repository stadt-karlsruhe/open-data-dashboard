import '@testing-library/jest-dom/jest-globals';
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
