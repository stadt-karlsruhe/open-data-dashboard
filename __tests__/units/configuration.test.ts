import { Dirent, promises as fs } from 'node:fs';
import { describe, expect, it } from '@jest/globals';
import { mockConfiguration, mockConfigurationPart1, mockConfigurationPart2 } from '~/data/configurations';

import YAML from 'yaml';
import { getConfiguration } from '@/configuration';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('yaml', () => ({
    parse: jest.fn(),
}));
jest.mock<typeof import('node:fs')>('node:fs', () => {
    const actual = jest.requireActual<typeof import('node:fs')>('node:fs');
    return {
        ...actual,
        promises: {
            ...actual.promises,
            readdir: jest.fn(),
            readFile: jest.fn(),
        },
    };
});
const mockFs = fs as jest.Mocked<typeof fs>;
const mockYAML = YAML as jest.Mocked<typeof YAML>;
const mockConfigDir = '/mock/config';

describe('getConfiguration', () => {
    process.env.CONFIGURATION_DIR = mockConfigDir;

    it('should return the merged configuration', async () => {
        expect.hasAssertions();
        mockFs.readdir.mockResolvedValueOnce([
            { name: 'mock1.app.config.yaml', isDirectory: () => false, isFile: () => true } as Dirent,
            { name: 'mock2.app.config.yml', isDirectory: () => false, isFile: () => true } as Dirent,
        ]);
        mockFs.readFile.mockResolvedValueOnce(Buffer.from(JSON.stringify(mockConfigurationPart1)));
        mockFs.readFile.mockResolvedValueOnce(Buffer.from(JSON.stringify(mockConfigurationPart2)));
        mockYAML.parse.mockReturnValueOnce(mockConfigurationPart1).mockReturnValueOnce(mockConfigurationPart2);

        const configuration = await getConfiguration();
        expect(configuration).toStrictEqual(mockConfiguration);
    });
});
