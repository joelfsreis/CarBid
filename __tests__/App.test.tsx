/**
 * @format
 */

const errorMock = jest.fn();
let spy: jest.SpyInstance;
beforeAll(() => {
  spy = jest.spyOn(console, 'error').mockImplementation(errorMock);
});

afterAll(() => {
  spy.mockRestore();
});

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../src/App';

test('renders correctly without errors', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
  expect(errorMock).not.toHaveBeenCalled();
});
