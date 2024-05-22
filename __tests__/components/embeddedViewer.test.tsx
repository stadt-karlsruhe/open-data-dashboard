/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { EmbeddedResource } from '@/types/configuration';
import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import { render } from '@testing-library/react';

const embeddedResource: EmbeddedResource = {
  id: '1',
  source: 'https://google.com/',
  name: 'Test',
  type: 'Embedded',
};

describe('component EmbeddedViewer', () => {
  it('should render iframe with correct source and height', () => {
    expect.hasAssertions();

    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 500 });

    const { getByTitle } = render(<EmbeddedViewer resource={embeddedResource} />);

    const iframe = getByTitle(embeddedResource.name) as HTMLIFrameElement;
    expect(iframe.src).toBe(embeddedResource.source);
    expect(iframe.title).toBe(embeddedResource.name);
    expect(iframe.height).toBe('500');
  });
});
