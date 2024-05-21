import '@testing-library/jest-dom/jest-globals';
import React from 'react';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { jest } from '@jest/globals';

global.React = React;
jest.mock('@/components/helper/WindowDimensions');

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
