// https://nextjs.org/docs/app/building-your-application/testing/jest
import { type Config } from '@jest/types';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

const jestConfig: Config.InitialOptions = {
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    moduleNameMapper: { '^~/data/(.*)$': '<rootDir>/_tests__/data/$1', '^@/(.*)$': '<rootDir>/src/$1' },
    transform: {
        '^.+\\.(t|j)sx?$': [
            '@swc/jest',
            {
                jsc: {
                    target: 'esnext',
                },
            },
        ],
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
    coveragePathIgnorePatterns: ['src/(middleware|locales|i18n).ts'],
    coverageReporters: ['lcov', 'text', 'text-summary'],
    bail: true,
    testRegex: String.raw`__tests__/.+\.test\.(ts|tsx)$`,
    errorOnDeprecated: true,
    verbose: true,
};

export default createJestConfig(jestConfig);
