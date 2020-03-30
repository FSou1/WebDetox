'use strict';

import {
  filter,
  isTextNode,
  hasTextContent,
  hasNoChildren,
  isContentEditable,
} from '../filter';

test('filter returns child node', () => {
  const html = '<div>' +
    '<p><span id="expected">foo</span></p>' +
    '<img src="bar.png" />' +
  '</div>';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const elements = doc.getElementsByTagName('*');
  const htmlElements = Array.from(elements).map((e: Element) => <HTMLElement>e);
  const filtered = filter(htmlElements);
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
  const htmlElements = Array.from(elements).map((e: Element) => <HTMLElement>e);
  const filtered = filter(htmlElements);
  expect(filtered.length).toBe(1);
  expect(filtered[0].id).toBe('expected');
});


test('filter does not return an input node', () => {
  const html = '<div>' +
    '<p><input type="text" id="name" name="name" size="10"></p>' +
  '</div>';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const elements = doc.getElementsByTagName('*');
  const htmlElements = Array.from(elements).map((e: Element) => <HTMLElement>e);
  const filtered = filter(htmlElements);
  expect(filtered.length).toBe(0);
});


test('filter does not return a textarea node', () => {
  const html = '<div>' +
    '<p><textarea id="story" name="story" rows="5" cols="33">' +
    'It was a dark and stormy night...' +
    '</textarea></p>' +
  '</div>';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const elements = doc.getElementsByTagName('*');
  const htmlElements = Array.from(elements).map((e: Element) => <HTMLElement>e);
  const filtered = filter(htmlElements);
  expect(filtered.length).toBe(0);
});


test('filter does not return a contenteditable node', () => {
  const html = '<div>' +
    '<p contenteditable="true">foo</p>' +
  '</div>';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const elements = doc.getElementsByTagName('*');
  const htmlElements = Array.from(elements).map((e: Element) => <HTMLElement>e);
  const filtered = filter(htmlElements);
  expect(filtered).not.toBeNull();
  /* The test case is invalid because jsdom doesn't support
     the contenteditable property.
     Read more: https://github.com/jsdom/jsdom/issues/1670 */

  // expect(filtered.length).toBe(0);
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
  const el = {textContent: str} as HTMLElement;
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
  ['input', false],
  ['textarea', false],
])('isTextNode %s > %p', (str, expected) => {
  const el = {nodeName: str} as HTMLElement;
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
  ['input', false],
  ['textarea', false],
])('isTextNode with DOM %s > %p', (str, expected) => {
  const id = 'foo';
  const html = `<${str} id='${id}'></${str}>`;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const element = doc.getElementById(id);
  expect(isTextNode(element)).toBe(expected);
});


test.each([
  [true, true],
  [false, false],
  [undefined, false],
  [null, false],
])('isContentEditable %s > %p', (str, expected) => {
  const el = {isContentEditable: str} as HTMLElement;
  expect(isContentEditable(el)).toBe(expected);
});
