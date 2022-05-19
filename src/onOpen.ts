const onOpen = () => {
  SpreadsheetApp.getUi()
    .createMenu('✌ Joey D Mail')
    .addItem('Show sidebar', 'showSidebar')
    .addSeparator()
    .addItem('Read Gmail', 'readGmail')
    .addToUi();
};

global.onOpen = onOpen;

export default onOpen;
