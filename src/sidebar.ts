import getGmailAliases from './alias';

const showSidebar = () => {
  const template = HtmlService.createTemplateFromFile('index');
  template.aliases = getGmailAliases();
  const html = template.evaluate().setTitle('Joey D Mail Sender');
  SpreadsheetApp.getUi().showSidebar(html);
};

export default showSidebar;
