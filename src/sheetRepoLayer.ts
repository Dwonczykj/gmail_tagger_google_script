

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

// export const saveJsonObjFile = (jsonData, fileName) => {
//   fs.writeFile(fileName + ".json", jsonData, function (err) {
//     if (err) {
//       console.log(err);
//     }
//   });
// }

export const saveJsonObjFile = (data, filename = 'data') => {
  /**
   * Creates a file in the users Google Drive
   */

  if (!filename.endsWith('.json')) {
    filename += '.json';
  }

  const fileSets = {
    title: filename,
    mimeType: 'application/json'
  };

  const blob = Utilities.newBlob(JSON.stringify(data), "application/vnd.google-apps.script+json");
  const file = Drive.Files.insert(fileSets, blob);
  Logger.log('ID: %s, File size (bytes): %s, type: %s', file.id, file.fileSize, file.mimeType);
}
