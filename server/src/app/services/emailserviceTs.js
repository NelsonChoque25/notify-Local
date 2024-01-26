// emailService.js
const { processBcpAlertsEmail, processBcpNotificationsEmail } = require('./emailParsingServiceTs');
const { parseEmailSubject, extractEmailDateTime } = require('../utils/emailUtils');
const { simpleParser } = require("mailparser");
const Imap = require("imap");
require("dotenv").config();

/*
 ** Configuración de la conexión IMAP
 */
const config = {
  user: process.env.EMAIL_USER_TS,
  password: process.env.EMAIL_PASSWORD_TS,
  host: process.env.EMAIL_HOST_TS,
  port: parseInt(process.env.IMAP_PORT),
  tls: process.env.EMAIL_TLS_TS === "true",
};

// Función para obtener los datos del correo electrónico
const getEmailData = () => {
  const imap = new Imap(config);

  imap.once("ready", () => {
    imap.openBox("BCP", false, (err, box) => {
      if (err) {
        console.error("Error al abrir la bandeja de entrada:", err);
        return;
      }

      const numMensajes = box.messages.total;
      console.log("Buscando mensajes...");
      console.log(`Hay ${numMensajes} mensajes en tu bandeja de entrada.`);

      imap.end();
    });
  });

  imap.once("error", (err) => {
    console.error("Error de conexión IMAP:", err);
  });

  imap.connect();
};

// Función para obtener los mensajes no leídos
const getAndFlagUnreadMessages = async () => {
  return new Promise((resolve, reject) => {
    const imap = new Imap(config);
    let emails = [];

    imap.once("ready", () => {
      imap.openBox("BCP", false, (err, box) => {
        if (err) {
          console.error("Error opening the inbox:", err);
          reject(err);
          return;
        }

        imap.search(["UNSEEN"], (searchErr, results) => {
          if (searchErr) {
            console.error("Error searching for unread messages:", searchErr);
            reject(searchErr);
            return;
          }

          if (results.length === 0) {
            console.log("No hay mensajes no leídos.");
            imap.end();
            resolve([]);
            return;
          }

          const f = imap.fetch(results, { bodies: "" });

          f.on("message", (msg) => {
            let message = "";
            let uid;

            msg.on("body", (stream) => {
              stream.on("data", (chunk) => {
                message += chunk.toString("utf8");
              });
            });

            msg.once("end", () => {
              emails.push({ uid, message });
            });

            msg.once("attributes", (attrs) => {
              uid = attrs.uid;
            });
          });

          f.once("error", (fetchErr) => {
            console.error("Error al recuperar mensajes:", fetchErr);
            reject(fetchErr);
          });

          f.once("end", () => {
            console.log("Mensajes no leídos recuperados.");
            imap.end();
            resolve(emails);
          });
        });
      });
    });

    imap.once("error", (err) => {
      console.error("IMAP connection error:", err);
      reject(err);
    });

    imap.connect();
  });
};

// Función para marcar un mensaje como leído
const markMessageAsRead = async (uid) => {
  return new Promise((resolve, reject) => {
    const imap = new Imap(config);

    imap.once("ready", () => {
      imap.openBox("BCP", false, (err) => {
        if (err) {
          reject(err);
          return;
        }

        imap.addFlags(uid, "\\Seen", (err) => {
          if (err) {
            reject(err);
            return;
          }
          imap.end();
          resolve();
        });
      });
    });

    imap.once("error", (err) => {
      reject(err);
    });

    imap.connect();
  });
};


/*
const processAndSaveEmails2 = async () => {
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
};*/

const processAndSaveEmails = async () => {
  try {
    const emails = await getAndFlagUnreadMessages();
    for (const { uid, message } of emails) {
      const parsedEmail = await simpleParser(message);
      const subject = parseEmailSubject(parsedEmail);
      //const senderName = extractSenderName(parsedEmail);
      const emailDate = extractEmailDateTime(parsedEmail);


      if (subject == "Transferencia a su favor por Telecrédito") {
        await processBcpAlertsEmail(parsedEmail, emailDate);
      }else if (subject == "Transferencia a su favor desde Telecrédito BCP"){
        // Manejo para casos en los que el asunto no coincide
        await processBcpNotificationsEmail(parsedEmail, emailDate);
        // Puedes agregar aquí lógica adicional o simplemente registrar la discrepancia
      }
      /* else if (subject.includes("TEST MESSAGE FROM:")) {
        await processTestHvEmail(parsedEmail, senderName);
      } else if (subject.includes("Embedded Net DVR")) {
        await processEventHvEmail(parsedEmail, senderName);
      } */
      

      await markMessageAsRead(uid);
    }
    console.log("Correos procesados y guardados correctamente.");
  } catch (error) {
    console.error("Error al procesar y guardar correos:", error);
    throw error;
  }
};

module.exports = { getEmailData, getAndFlagUnreadMessages, markMessageAsRead, processAndSaveEmails };
