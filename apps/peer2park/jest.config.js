module.exports = {
  name: 'peer2park',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/peer2park',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
