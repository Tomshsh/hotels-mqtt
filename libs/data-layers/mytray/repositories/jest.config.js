module.exports = {
  name: 'data-layers-mytray-repositories',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/data-layers/mytray/repositories',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ],
  setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
};
