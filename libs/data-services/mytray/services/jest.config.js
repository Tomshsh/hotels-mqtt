module.exports = {
  name: 'data-services-mytray-services',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/data-services/mytray/services',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ],
  setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
};
