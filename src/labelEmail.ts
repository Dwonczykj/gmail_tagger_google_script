function getAddGmailLabel(name) {
  let label = GmailApp.getUserLabelByName(name);

  if (!label) {
    label = GmailApp.createLabel(name);
  }

  return label;
}

export default getAddGmailLabel;
