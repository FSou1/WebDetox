import {nullOrEmpty, trim} from './string';

/**
 *
 *
 * @param {Element[]} elements
 * @return {Element[]}
 */
export function filter(elements: Element[]): Element[] {
  return elements
      .filter((el) => hasNoChildren(el))
      .filter((el) => hasTextContent(el))
      .filter((el) => isTextNode(el));
}

/**
 *
 *
 * @export
 * @param {Element} element
 * @return {boolean}
 */
export function hasNoChildren(element: Element): boolean {
  return element.childElementCount == 0;
}


/**
 *
 *
 * @export
 * @param {Element} element
 * @return {boolean}
 */
export function hasTextContent(element: Element): boolean {
  return !nullOrEmpty(trim(element.textContent));
}


/**
 *
 *
 * @export
 * @param {Element} element
 * @return {boolean}
 */
export function isTextNode(element: Element): boolean {
  const ignored = [
    'img',
    'style',
    'script',
    'head',
    'meta',
    'link',
    'br',
    'time',
    'html',
    'body',
    'svg',
    'g',
    'path',
    'iframe',
  ];

  return ignored.indexOf(element.nodeName.toLowerCase()) == -1;
}
