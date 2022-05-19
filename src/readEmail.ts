import { saveThreadsToJson, saveThreadToSheetStorage } from './sheetRepoLayer';

export function isThreadProcessed(threadMsgs: GoogleAppsScript.Gmail.GmailMessage[]) {
  const key = 'joeyd filters';
  const props = PropertiesService.getScriptProperties();
  const when = threadMsgs[0].getDate().getTime();
  const last = props.getProperty(key) ? parseInt(props.getProperty(key), 10) : 0;
  props.setProperty(key, when.toString());
  if (threadMsgs.length === 1 && when >= last) {
    return false;
  }
  return true;
}

export function getGmail(limitCount = 20) {
  try {
    return GmailApp.search('in:inbox is:unread', 0, limitCount);
  } catch (e) {
    Logger.log(e.toString());
    return [];
  }
}

export function readGmailToGSheets(limitCount = 20) {
  const threads = getGmail(limitCount);
  try {
    if (threads.length > 0) {
      for (let t = threads.length - 1; t >= 0; t -= 1) {
        const messages = threads[t].getMessages();
        if (!isThreadProcessed(messages)) {
          Logger.log(`Processing ${messages[0].getDate()} :: ${messages[0].getSubject()}`);
          // message.getRawContent();
          saveThreadToSheetStorage(messages[0].getFrom(), messages[0].getSubject());
        } else {
          Logger.log(`Skipping ${messages[0].getDate()} :: ${messages[0].getSubject()}`);
        }
      }
    }
  } catch (e) {
    Logger.log(e.toString());
  }
}

export const saveLastNEmailsToJsonLocal = (limitCount = 100) => {
  const threads = getGmail(limitCount);
  try {
    saveThreadsToJson(threads);
  } catch (error) {
    Logger.log(error.toString());
  }
}
