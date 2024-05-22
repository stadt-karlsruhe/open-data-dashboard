import '@testing-library/jest-dom/jest-globals';
import { ReadonlyURLSearchParams } from 'next/navigation';

// Global mocks

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('next/navigation', () => {
  return {
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
    useParams: () => ({ locale: 'en' }),
  };
});
