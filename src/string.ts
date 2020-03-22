/**
 *
 *
 * @export
 * @param {string} str
 * @return {boolean}
 */
export function nullOrEmpty(str: string): boolean {
  return str == null || str === '';
}


/**
 *
 *
 * @export
 * @param {string} str
 * @return {string}
 */
export function trim(str: string): string {
  return nullOrEmpty(str) ? str : str.trim();
}
