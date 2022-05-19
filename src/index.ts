import onOpen from './onOpen';
import { readGmailToGSheets, saveLastNEmailsToJsonLocal } from './readEmail';
import sendEmail from './sendEmail';
import showSidebar from './sidebar';
import doGet from './webapp';

global.onOpen = onOpen;
global.showSidebar = showSidebar;
global.sendEmail = sendEmail;
global.doGet = doGet;
global.readGmail = readGmailToGSheets;
global.saveLastNEmailsToJsonLocal = saveLastNEmailsToJsonLocal;