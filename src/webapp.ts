import getGmailAliases from './alias';

const doGet = () => {
  const template = HtmlService.createTemplateFromFile('index');
  template.aliases = getGmailAliases();
  const html = template.evaluate().setTitle('Joey D Mail Sender');
  return html;
};

export default doGet;
