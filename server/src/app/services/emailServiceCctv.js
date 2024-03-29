// emailService.js
const {
  processSamsungEmail,
  processTestHvEmail,
  processEventHvEmail,
} = require("./emailParsingService");
const { parseEmailSubject, extractSenderName } = require("../utils/emailUtils");
const { simpleParser } = require("mailparser");
const Imap = require("imap");
require("dotenv").config();

/*
 ** Configuración de la conexión IMAP
 */
const config = {
  user: process.env.EMAIL_USER_CCTV,
  password: process.env.EMAIL_PASSWORD_CCTV,
  host: process.env.EMAIL_HOST_CCTV,
  port: parseInt(process.env.IMAP_PORT),
  tls: process.env.EMAIL_TLS_CCTV === "true",
};

// Función para obtener los datos del correo electrónico
const getEmailData = () => {
  const imap = new Imap(config);

  imap.once("ready", () => {
    imap.openBox("INBOX", false, (err, box) => {
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
      imap.openBox("INBOX", false, (err, box) => {
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
      imap.openBox("INBOX", false, (err) => {
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

// Función para procesar y guardar los correos electrónicos
const processAndSaveEmails = async (io) => {
  try {
    const emails = await getAndFlagUnreadMessages();

    // Emitir un evento con la cantidad total de correos por procesar
    io.emit("totalEmailsToProcess", { total: emails.length });

    for (const { uid, message } of emails) {
      const parsedEmail = await simpleParser(message);
      const subject = parseEmailSubject(parsedEmail);
      const senderName = extractSenderName(parsedEmail);

      if (subject.includes("SDR-B73303")) {
        await processSamsungEmail(parsedEmail);
      } else if (subject.includes("TEST MESSAGE FROM:")) {
        await processTestHvEmail(parsedEmail, senderName);
      } else if (subject.includes("Embedded Net DVR")) {
        await processEventHvEmail(parsedEmail, senderName);
      }

      await markMessageAsRead(uid);

      io.emit("emailProcessed", { uid, subject });
    }
    console.log("Correos procesados y guardados correctamente.");

    io.emit("allEmailsProcessed");
    
  } catch (error) {
    console.error("Error al procesar y guardar correos:", error);
    throw error;
  }
};

module.exports = {
  getEmailData,
  getAndFlagUnreadMessages,
  markMessageAsRead,
  processAndSaveEmails,
};
