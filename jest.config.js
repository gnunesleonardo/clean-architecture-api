module.exports = {
  roots: ['<rootDir>/tests'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/tests/**/*.ts',
    '!**/test/**',
    '!**/config/**'
  ],
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
