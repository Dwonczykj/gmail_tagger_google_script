import * as fs from 'fs';


export const saveThreadToSheetStorage = (emailFrom: string, emailSubject: string) => {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([emailFrom, emailSubject]);
};

export const saveThreadsToJson = (threads: GoogleAppsScript.Gmail.GmailThread[]) => {
  const out = [];
  threads.forEach(thread => {
    const messages = thread.getMessages();
    const fromEmailAddress = messages[0].getFrom();
    // const firstSendDate = messages[0].getDate();
    // const originalSubject = messages[0].getSubject();
    const originalSubject = thread.getFirstMessageSubject();
    const body = messages.reduce((accum, cur) => accum + '\n' + cur, '');
    out.push({
      'subject': originalSubject,
      'from': fromEmailAddress,
      'body': body,
    });
  });
  saveJsonObjFile(out, 'emails');
}

export const saveJsonObjFile = (jsonData, fileName) => {
  fs.writeFile(fileName + ".json", jsonData, function (err) {
    if (err) {
      console.log(err);
    }
  });
}
