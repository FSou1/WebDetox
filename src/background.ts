// eslint-disable-next-line no-unused-vars
import {Message} from './message';

/**
 *
 *
 * @param {Message} message
 * @return {void}
 */
function handleMessage(message: Message): void {
  switch (message.type) {
    case 'set_badge': {
      chrome.browserAction.setBadgeText({text: message.data});
      break;
    }
    default:
      throw new Error('Unknown message type: ' + message.type);
  }
}

chrome.runtime.onMessage.addListener(handleMessage);
