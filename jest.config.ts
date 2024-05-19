import { type Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },

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
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
    coveragePathIgnorePatterns: ['src/(middleware|locales|i18n).ts'],
    testEnvironment: 'node',

    bail: true,
    testRegex: String.raw`__tests__/.+\.test\.ts$`,
    errorOnDeprecated: true,
    verbose: true,
};

export default jestConfig;
