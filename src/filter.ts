import {nullOrEmpty, trim} from './string';

/**
 *
 *
 * @param {Element[]} elements
 * @return {Element[]}
 */
export function filter(elements: HTMLElement[]): HTMLElement[] {
  return elements
      .filter((el) => hasNoChildren(el))
      .filter((el) => hasTextContent(el))
      .filter((el) => isTextNode(el))
      .filter((el) => !isContentEditable(el));
}

/**
 *
 *
 * @export
 * @param {Element} element
 * @return {boolean}
 */
export function hasNoChildren(element: HTMLElement): boolean {
  return element.childElementCount == 0;
}


/**
 *
 *
 * @export
 * @param {Element} element
 * @return {boolean}
 */
export function hasTextContent(element: HTMLElement): boolean {
  return !nullOrEmpty(trim(element.textContent));
}


/**
 *
 *
 * @export
 * @param {Element} element
 * @return {boolean}
 */
export function isTextNode(element: HTMLElement): boolean {
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
    'input',
    'textarea',
  ];

  return ignored.indexOf(element.nodeName.toLowerCase()) == -1;
}


/**
 *
 *
 * @export
 * @param {Element} element
 * @return {boolean}
 */
export function isContentEditable(element: HTMLElement): boolean {
  return element.isContentEditable === true;
}
