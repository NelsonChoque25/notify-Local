const { processAndSaveEmails } = require('../../services/emailserviceTs');

const readAndProcessUnreadEmails = async (req, res) => {
  try {
    await processAndSaveEmails();
    res.send("Unread emails processed.");
  } catch (error) {
    console.error("Error in email processing:", error);
    res.status(500).send("Error processing unread emails.");
  }
};


module.exports = { readAndProcessUnreadEmails };
