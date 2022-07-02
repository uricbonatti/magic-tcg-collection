const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/interfaces/*.ts",
    "!<rootDir>/src/**/containers/*.ts",
    "!<rootDir>/src/**/entities/*.ts",
    "!<rootDir>/src/**/schemas/*.ts",
    "!<rootDir>/src/@types/*.ts",
    "!<rootDir>/src/shared/app/server.ts",
    "!<rootDir>/src/config/*.ts",
    "!<rootDir>/src/shared/utils/logger.ts",
    "!<rootDir>/src/shared/utils/MethodLogger.ts",
    "!<rootDir>/src/shared/telemetry/*.ts",
    "!<rootDir>/src/shared/middlewares/metrics.ts",
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  coverageProvider: "v8",
  coverageReporters: ["text-summary", "lcov","json-summary"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.spec.ts"],
  moduleNameMapper: pathsToModuleNameMapper({
    "@config/*": ["config/*"],    
    "@modules/*": ["modules/*"],
    "@shared/*": ["shared/*"],
  }, {
    prefix: '<rootDir>/src/',
  }),
  reporters:['default']
};
