module.exports = {
  name: 'shared-client-auth',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/client/auth',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ],
  setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
};
