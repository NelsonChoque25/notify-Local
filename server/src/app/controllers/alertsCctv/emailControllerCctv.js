const { getAndFlagUnreadMessages, markMessageAsRead } = require("../../services/emailServiceCctv");
const Event = require("../../models/alertCctv/Event");
const Test = require("../../models/alertCctv/Test");
const { simpleParser } = require("mailparser");

const readAndProcessUnreadEmails = async (req, res) => {
  try {
    await processAndSaveEmails();
    res.send("Correos no leídos procesados.");
  } catch (error) {
    console.error("Error en el procesamiento de correos:", error);
    res.status(500).send("Error al procesar correos no leídos.");
  }
};

const processAndSaveEmails = async () => {
  try {
    const emails = await getAndFlagUnreadMessages();

    for (const { uid, message } of emails) {
      const parsedEmail = await simpleParser(message);
      const subject = parsedEmail.subject;
      const emailDate = parsedEmail.date;
      const body = parsedEmail.text;
      const senderInfo = parsedEmail.from.text;
      const senderName = senderInfo.match(/^(.*?)\s*</)[1].replace(/"/g, '');
    
      if (subject.includes('Embedded Net DVR')) {
        if (subject.includes('TEST MESSAGE FROM:')) {
          // Procesar como prueba (TEST MESSAGE)
          await Test.create({
            name: senderName,
            message: parsedEmail.text,
            date: emailDate,
          });
        } else {
          // Procesar como evento de DVR (Embedded Net DVR)
          const eventTypeMatch = body.match(/EVENT TYPE:\s*(.*)/);
          const eventTimeMatch = body.match(/EVENT TIME:\s*(.*)/);
          const dvrNameMatch = body.match(/DVR NAME:\s*(.*)/);
          const dvrSNMatch = body.match(/DVR S\/N:\s*(.*)/);
          const cameraNameMatch = body.match(/CAMERA NAME\(NUM\):\s*(.*)/);
    
          await Event.create({
            name: senderName,
            eventType: eventTypeMatch ? eventTypeMatch[1].trim() : "",
            eventTime: eventTimeMatch
              ? new Date(eventTimeMatch[1].replace(",", " "))
              : null,
            dvrName: dvrNameMatch ? dvrNameMatch[1].trim() : "",
            dvrSerialNumber: dvrSNMatch ? dvrSNMatch[1].trim() : "",
            cameraName: cameraNameMatch ? cameraNameMatch[1].trim() : "",
          });
        }
      } else {
        console.log("Correo no procesado:", subject);
      }
    
      // Marcar el correo como leído
      await markMessageAsRead(uid);
    }

    console.log("Correos procesados y guardados correctamente.");

  } catch (error) {
    console.error("Error al procesar y guardar correos:", error);
  }
};


module.exports = { readAndProcessUnreadEmails };
