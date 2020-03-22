/**
 *
 *
 * @param {string} text
 * @return {string}
 */
export function replace(text: string): string {
  return text
      .replace(/коронавирус/gi, '**********')
      .replace(/coronavirus/gi, '***********')
      .replace(/путин/gi, '*****')
      .replace(/кремл/gi, '*****')
      .replace(/covid/gi, '*****')
      .replace(/пандеми/gi, '*******');
}
