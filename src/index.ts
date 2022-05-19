import onOpen from './onOpen';
import { readGmail } from './readEmail';
import sendEmail from './sendEmail';
import showSidebar from './sidebar';
import doGet from './webapp';

global.onOpen = onOpen;
global.showSidebar = showSidebar;
global.sendEmail = sendEmail;
global.doGet = doGet;
global.readGmail = readGmail;
