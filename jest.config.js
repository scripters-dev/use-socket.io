module.exports = {
    roots: [
        '<rootDir>/src',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: [
        '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    setupTestFrameworkScriptFile: '<rootDir>/src/setupEnzyme.ts',
};
