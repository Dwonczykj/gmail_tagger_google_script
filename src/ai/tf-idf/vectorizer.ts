import natural from 'natural';
import { getGmail, isThreadProcessed } from '../../readEmail';

const key = 'Tf-Idf';

const loadTfIdfFromProps = () => {
  const props = PropertiesService.getScriptProperties();
  const { TfIdf } = natural;

  const tfidf = props.getProperty(key) ? props.getProperty(key) : new TfIdf();
  return tfidf;
};

const save = (tfidfNew) => {
  const props = PropertiesService.getScriptProperties();
  props.setProperty(key, tfidfNew);
  tfidfNew.save('tfidf.json', function (err, classifier) {
    if (err) {
      Logger.log(`Error: ${err}`);
    }
  });
};

const vectorizeMail = (limit, isProcessed) => {
  const tfidf = loadTfIdfFromProps();
  const threads = getGmail(limit);
  try {
    if (threads.length > 0) {
      for (let t = threads.length - 1; t >= 0; t -= 1) {
        const messages = threads[t].getMessages();
        if (!isProcessed(messages)) {
          for (let m = 0; m < messages.length; m += 1) {
            tfidf.addDocument(messages[m].getSubject());
            //   tfidf.addDocument(messages[m].getBody());
          }
        } else {
          Logger.log(`Skipping ${messages[0].getDate()} :: ${messages[0].getSubject()}`);
        }
      }
    }
    save(tfidf);
  } catch (e) {
    Logger.log(e.toString());
    return null;
  }
  return tfidf;
};

export function vectorizeNewMail() {
  return vectorizeMail(50, isThreadProcessed);
}

export function vectorizeAllMail() {
  const tfidf = vectorizeMail(50, (_) => false);

  return tfidf;
}
