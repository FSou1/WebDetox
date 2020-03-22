'use strict';

import {nullOrEmpty, trim} from '../string';

test.each([
  [null, true],
  ['', true],
  [undefined, true],
])('nullOrEmpty %s > %p', (str, expected) => {
  expect(nullOrEmpty(str)).toBe(expected);
});


test.each([
  ['', ''],
  [null, null],
  [' ', ''],
  ['   bar ', 'bar'],
  ['foo      ', 'foo'],
])('trim %s > %s', (str, expected) => {
  expect(trim(str)).toBe(expected);
});
