const getGmailAliases = () => [Session.getActiveUser().getEmail(), ...GmailApp.getAliases()];

export default getGmailAliases;
