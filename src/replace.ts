/**
 *
 *
 * @param {string} text
 * @return {string}
 */
export function replace(text: string): string {
  const blacklist = [
    'коронавирус',
    'путин',
    'кремл',
    'пандеми',
    'медве',
    'собя',
    'голико',
    'зени',
    'спарта',
    'covid',
    'coronavirus',
  ];

  for (const word of blacklist) {
    text = text.replace(
        new RegExp(word, 'gi'),
        new Array(word.length).fill('*').join(''),
    );
  }

  return text;
}
