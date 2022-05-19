const sendEmail = (data: { to: string, from: string, subject: string, body: string }) => {
  const { to, from, subject, body } = data;
  try {
    GmailApp.sendEmail(to, subject, body, {
      from,
    });
  } catch (f) {
    try {
      MailApp.sendEmail(to, subject, body);
    } catch (error) {
      return `Error: ${error.toString()}`;
    }
  }
  return `Email sent to ${to}`;
};

export default sendEmail;
