const { getAndFlagUnreadMessages, markMessageAsRead } = require("../../services/emailserviceTs");
const BcpAlerts = require("../../models/teleservices/BcpAlerts");
const { simpleParser } = require("mailparser");

const readAndProcessUnreadEmails = async (req, res) => {
  try {
    await processAndSaveEmails();
    res.send("Unread emails processed.");
  } catch (error) {
    console.error("Error in email processing:", error);
    res.status(500).send("Error processing unread emails.");
  }
};

const processAndSaveEmails = async () => {
  try {
    const emails = await getAndFlagUnreadMessages();
    for (const { uid, message } of emails) {
      const parsedEmail = await simpleParser(message);
      const subject = parsedEmail.subject;
      const senderInfo = parsedEmail.from.text;
      const senderEmail = senderInfo.match(/<(.*)>/)?.[1];

      if (senderEmail == "ALERTASYAVISOS@BCP.COM.PE") {
        const body = parsedEmail.text;
        const extractMatch = (regex) => {
          const match = body.match(regex);
          return match && match[1] ? match[1].trim() : "";
        };

        const orderingCompany = extractMatch(/Empresa ordenante:\s*(.*)/);
        const dateTime = extractMatch(/Fecha y hora:\s*(.*)/);
        const beneficiary = extractMatch(/Beneficiario:\s*(.*)/);
        const account = extractMatch(/N° de cuenta:\s*(.*)/);
        const amount = extractMatch(/Importe:\s*(.*)/);
        const message = extractMatch(/Mensaje:\s*(.*)/);
        const dateTimeToSave = dateTime ? new Date(dateTime) : new Date();

        const newAlert = await BcpAlerts.create({
          orderingCompany,
          beneficiary,
          account,
          amount,
          message,
          dateTime: dateTimeToSave,
        });

        console.log(newAlert.get({ plain: true }));
      } else {
        console.log("Email not processed:", subject);
      }

      await markMessageAsRead(uid);
    }

    console.log("Emails processed and saved correctly.");
  } catch (error) {
    console.error("Error processing and saving emails:", error);
  }
};

module.exports = { readAndProcessUnreadEmails };
