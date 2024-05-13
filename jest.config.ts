import { type Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
    preset: 'ts-jest/presets/default-esm',

    extensionsToTreatAsEsm: ['.ts', '.mts', '.json'],
    moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },

    transform: {
        '.test.m?ts$': [
            'ts-jest',
            {
                useESM: true,
                isolatedModules: false,
            },
        ],
    },
    collectCoverageFrom: ['<rootDir>/src/**/.ts'],
    testEnvironment: 'node',

    bail: true,
    testRegex: '__tests__/.+\\.test\\.ts$',
    coveragePathIgnorePatterns: ['<rootDir>/src/main.m?ts$', '.*.module.m?ts$', '<rootDir>/src/health/'],
    coverageReporters: ['text-summary', 'html'],
    errorOnDeprecated: true,
    verbose: true,
};

export default jestConfig;
