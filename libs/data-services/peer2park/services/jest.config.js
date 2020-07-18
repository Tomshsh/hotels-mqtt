module.exports = {
  name: 'data-services-peer2park-services',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/data-services/peer2park/services',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
