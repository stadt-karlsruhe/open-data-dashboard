/**
 * @jest-environment jsdom
 */
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import DashboardContents from '@/components/dashboard-resource/dashboard/DashboardContents';
import { mockConfiguration } from '~/data/configurations';

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('@/components/dashboard-resource/dashboard/DashboardContent', () =>
  jest.fn(() => <div>Mocked DashboardContent</div>),
);

describe('component DashboardContents', () => {
  it('should render the correct number of DashboardContent components', () => {
    expect.hasAssertions();
    render(<DashboardContents dashboard={mockConfiguration.dashboards[1]} configuration={mockConfiguration} />);
    const dashboardContents = screen.getAllByText('Mocked DashboardContent');
    expect(dashboardContents[1]).toBeInTheDocument();
    expect(dashboardContents).toHaveLength(3);
  });
});
