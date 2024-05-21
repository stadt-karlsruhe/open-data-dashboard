import '@testing-library/jest-dom/jest-globals';
import React from 'react';
import { jest } from '@jest/globals';

global.React = React;
jest.mock('@/components/helper/WindowDimensions');
