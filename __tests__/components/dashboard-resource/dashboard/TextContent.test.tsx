/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import TextContent from '@/components/dashboard-resource/dashboard/TextContent';
import { mockTextContent } from '~/data/dashboardContents';

describe('component TextContent', () => {
  it('should render with correct content', () => {
    expect.hasAssertions();

    render(<TextContent content={mockTextContent} />);

    expect(screen.getByText(mockTextContent.header)).toBeInTheDocument();
  });
});
