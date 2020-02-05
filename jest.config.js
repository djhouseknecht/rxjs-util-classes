

module.exports = {
  testEnvironment: 'node',
  roots: [
    '<rootDir>/src',
    '<rootDir>/test'
  ],
  testMatch: [
    '<rootDir>/test/**/*.spec.(ts|js)'
  ],
  modulePaths: [
    'src',
    '/node_modules/'
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
    // '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/types/**'
  ],
  coverageReporters: [
    'lcov', 'text'
  ],
  coverageThreshold: {
    // global: {
    //   branches: 100,
    //   functions: 100,
    //   lines: 100,
    //   statements: 100
    // }
  },
  coverageDirectory: './coverage'
};
