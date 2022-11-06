module.exports = {
    roots: ['packages', 'lib/parsers'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
    testEnvironment: 'node',
    collectCoverageFrom: [
        'lib/parsers/**/*.js',
        'packages/**/*.js',
        '!**/coverage/**',
    ],
};
