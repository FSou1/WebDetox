'use strict';

import {replace} from '../replace';

test.each([
  ['коронавирус', '***********'],
  ['coronavirus', '***********'],
  ['путин', '*****'],
  ['кремл', '*****'],
  ['covid', '*****'],
  ['пандеми', '*******'],
])('replace %s > %s', (str, expected) => {
  expect(replace(str)).toBe(expected);
});
