'use strict';

import {isTextNode, hasTextContent, hasNoChildren, filter} from '../filter';

test('filter returns child node', () => {
  const html = '<div>' +
    '<p><span id="expected">foo</span></p>' +
    '<img src="bar.png" />' +
  '</div>';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const elements = doc.getElementsByTagName('*');
  const filtered = filter(Array.from(elements));
  expect(filtered.length).toBe(1);
  expect(filtered[0].id).toBe('expected');
});


test('filter returns text node, with text, and without children', () => {
  const html = '<div>' +
    '<h1 id="expected">text</h1>' +
    '<img src="bar.png" />' +
  '</div>';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const elements = doc.getElementsByTagName('*');
  const filtered = filter(Array.from(elements));
  expect(filtered.length).toBe(1);
  expect(filtered[0].id).toBe('expected');
});


test('div with p hasNoChildren > false', () => {
  const id = 'foo';
  const html = `<div id='${id}'><p>bar</p></div>`;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const element = doc.getElementById(id);
  expect(element).not.toBeNull();
  expect(hasNoChildren(element)).toBe(false);
});


test('div without p hasNoChildren > true', () => {
  const id = 'foo';
  const html = `<div id='${id}'></div>`;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const element = doc.getElementById(id);
  expect(element).not.toBeNull();
  expect(hasNoChildren(element)).toBe(true);
});


test.each([
  ['foo', true],
  ['', false],
  [' ', false],
  [null, false],
  [undefined, false],
])('hasTextContent %s > %p', (str, expected) => {
  const el = {textContent: str} as Element;
  expect(hasTextContent(el)).toBe(expected);
});


test.each([
  ['foo', true],
  ['', false],
  [' ', false],
])('hasTextContent with DOM %s > %p', (str, expected) => {
  const id = 'foo';
  const html = `<span id='${id}'>${str}</span>`;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const element = doc.getElementById(id);
  expect(element).not.toBeNull();
  expect(hasTextContent(element)).toBe(expected);
});


test.each([
  ['a', true],
  ['span', true],
  ['p', true],
  ['div', true],
  ['IFRAME', false],
  ['path', false],
  ['g', false],
  ['svg', false],
  ['BODY', false],
  ['HTML', false],
  ['TIME', false],
  ['BR', false],
  ['LINK', false],
  ['META', false],
  ['HEAD', false],
  ['SCRIPT', false],
  ['STYLE', false],
  ['IMG', false],
])('isTextNode %s > %p', (str, expected) => {
  const el = {nodeName: str} as Element;
  expect(isTextNode(el)).toBe(expected);
});


test.each([
  ['a', true],
  ['span', true],
  ['p', true],
  ['div', true],
  ['IFRAME', false],
  ['path', false],
  ['g', false],
  ['svg', false],
  ['BODY', false],
  ['HTML', false],
  ['TIME', false],
  ['BR', false],
  ['LINK', false],
  ['META', false],
  ['HEAD', false],
  ['SCRIPT', false],
  ['STYLE', false],
  ['IMG', false],
])('isTextNode with DOM %s > %p', (str, expected) => {
  const id = 'foo';
  const html = `<${str} id='${id}'></${str}>`;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const element = doc.getElementById(id);
  expect(isTextNode(element)).toBe(expected);
});
