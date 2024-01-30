const { processAndSaveEmails } = require('../../services/emailServiceTs');

const readAndProcessUnreadEmails = async (req, res) => {

  const io = req.io;

  try {
    await processAndSaveEmails(io);
    res.send("Unread emails processed.");
  } catch (error) {
    console.error("Error in email processing:", error);
    res.status(500).send("Error processing unread emails.");
  }
};


module.exports = { readAndProcessUnreadEmails };
