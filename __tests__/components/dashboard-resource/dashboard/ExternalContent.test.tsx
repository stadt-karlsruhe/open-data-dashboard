/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import ExternalContent from '@/components/dashboard-resource/dashboard/ExternalContent';
import { mockExternalContent } from '~/data/dashboardContents';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/visualization/EmbeddedViewer', () => jest.fn(() => <div>Mocked EmbeddedViewer</div>));

describe('component ExternalContent', () => {
  it('should render with correct content', () => {
    expect.hasAssertions();

    render(<ExternalContent content={mockExternalContent} />);

    expect(screen.getByText('Mocked EmbeddedViewer')).toBeInTheDocument();
  });
});
