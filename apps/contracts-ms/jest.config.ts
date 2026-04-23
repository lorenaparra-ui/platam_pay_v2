import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  collectCoverageFrom: ['src/**/*.(t|j)s', '!src/**/*.spec.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@messaging/(.*)$': '<rootDir>/src/modules/messaging/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@platam/shared$': '<rootDir>/../../libs/shared/src',
    '^@app/products-data$': '<rootDir>/../../libs/products-data/src',
  },
};

export default config;
