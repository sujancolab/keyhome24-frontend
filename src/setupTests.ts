import '@testing-library/jest-dom';

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock de navigator.share
Object.defineProperty(window, 'navigator', {
  value: {
    ...window.navigator,
    share: jest.fn()
  }
});