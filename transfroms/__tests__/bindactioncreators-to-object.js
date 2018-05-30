jest.autoMockOff();

const { defineTest } = require('jscodeshift/dist/testUtils');

const cases = [
  'in-variable',
  'one-import',
  'with-compose',
  'no-replace',
  'no-actions',
  'with-params',
  'dispatch-to-props-getter',
  'multiple-replacements',
];

cases.forEach(c => {
  defineTest(__dirname, 'bindactioncreators-to-object', null, c);
});
