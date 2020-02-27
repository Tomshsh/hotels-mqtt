module.exports = {
  name: 'database',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/database',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
