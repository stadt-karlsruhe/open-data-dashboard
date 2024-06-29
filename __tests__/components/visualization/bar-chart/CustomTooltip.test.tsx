/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import CustomTooltip from '@/components/visualization/bar-chart/CustomTooltip';

const defaultProps = {
  active: true,
  axesMap: new Map<string, Map<string, boolean>>(),
  xAxis: 'xAxis',
  payload: [
    {
      payload: {
        xAxis: 'xAxisValue',
        yAxis1: 'yAxis1Value',
        yAxis2: 'yaAxis2Value',
      },
    },
  ],
};

describe('component CustomTooltip', () => {
  it('should render null when active is false', () => {
    expect.hasAssertions();
    const props = { ...defaultProps, active: false };
    const { container } = render(<CustomTooltip {...props} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render an empty tooltip when payload is empty or missing', () => {
    expect.hasAssertions();
    const props = { ...defaultProps, payload: [] };
    const { container } = render(<CustomTooltip {...props} />);
    expect(container.firstChild?.firstChild).toHaveClass('recharts-tooltip-label');
    expect(container.firstChild?.firstChild).toBeEmptyDOMElement();
  });

  it('should render the additional tooltip items', () => {
    expect.hasAssertions();
    render(<CustomTooltip {...defaultProps} />);
    expect(screen.getByText('yAxis1')).toBeInTheDocument();
    expect(screen.getByText('yAxis2')).toBeInTheDocument();
  });
});
