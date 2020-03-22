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
 */
function process() {
  const elements = document.getElementsByTagName('*') || [];
  const filtered = filter(Array.from(elements)) || [];

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
