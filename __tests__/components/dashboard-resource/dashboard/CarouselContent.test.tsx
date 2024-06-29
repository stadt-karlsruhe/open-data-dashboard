/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import CarouselContent from '@/components/dashboard-resource/dashboard/CarouselContent';
import { mockCarouselContent } from '~/data/dashboardContents';

describe('component CarouselContent', () => {
  it('should render with correct content', () => {
    expect.hasAssertions();

    render(<CarouselContent content={mockCarouselContent} />);

    expect(screen.getByText(mockCarouselContent.slides[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockCarouselContent.slides[0].text)).toBeInTheDocument();
  });
});
