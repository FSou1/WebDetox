// eslint-disable-next-line no-unused-vars
import {Message} from './message';
import {replace} from './replace';
import {filter} from './filter';


/**
 *
 *
 * @param {string} text
 */
function setBadge(text: string) {
  const message: Message = {type: 'set_badge', data: text};
  chrome.runtime.sendMessage(message);
}


/**
 *
 *
 * @export
 * @param {Element} element
 * @return {HTMLElement}
 */
export function asHTMLElement(element: Element): HTMLElement {
  return <HTMLElement>element;
}

/**
 *
 *
 */
function process() {
  const elements = document.getElementsByTagName('*') || [];
  const htmlElements = Array.from(elements).map(asHTMLElement) || [];
  const filtered = filter(htmlElements) || [];

  for (const element of filtered) {
    element.textContent = replace(element.textContent);
  }
}

let iteration = 0;
const _observer = new MutationObserver(function() {
  process();
  setBadge((iteration++).toString());
});
_observer.observe(document.documentElement, {childList: true, subtree: true});
