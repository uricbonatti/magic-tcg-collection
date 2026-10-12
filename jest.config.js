const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

const base = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
};

module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov', 'json-summary'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/interfaces/*.ts',
    '!<rootDir>/src/**/containers/*.ts',
    '!<rootDir>/src/**/schemas/*.ts',
    '!<rootDir>/src/@types/*.ts',
    '!<rootDir>/src/shared/app/server.ts',
    '!<rootDir>/src/config/*.ts',
    '!<rootDir>/src/shared/utils/logger.ts',
    '!<rootDir>/src/shared/utils/MethodLogger.ts'
  ],
  coverageThreshold: { global: { branches: 50, functions: 50, lines: 50, statements: 50 } },
  projects: [
    { ...base, displayName: 'unit', testMatch: ['<rootDir>/tests/unit/**/*.spec.ts'] },
    { ...base, displayName: 'e2e', testMatch: ['<rootDir>/tests/e2e/**/*.spec.ts'] }
  ]
};
