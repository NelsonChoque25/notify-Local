const { getAndFlagUnreadMessages, markMessageAsRead,} = require("../../services/emailServiceCctv");
const EventsSamsung = require("../../models/alertCctv/EventsSamsung");
const TestsSamsung = require("../../models/alertCctv/TestsSamsung");
const EventHv = require("../../models/alertCctv/EventHv");
const TestHv = require("../../models/alertCctv/TestHv");
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

const extractDataFromBody = (body, regex) => {
  const match = body.match(regex);
  return match ? match[1].trim() : "";
};

const processSamsungEmail = async (parsedEmail) => {
  const body = parsedEmail.text;
  const senderInfo = parsedEmail.from.text;
  const senderName = senderInfo.match(/<([^>]*)>/)[1];
  const macAddress = extractDataFromBody(body, /MAC address:\s*(.*)/);
  const testMessage = "This testing E-mail";

  if (body.includes(testMessage)) {
    await TestsSamsung.create({
      name: senderName,
      macAddress: macAddress,
      eventName: "Test Email",
      message: testMessage,
      datetime:  parsedEmail.date,
    });
  } else {
    const bodySections = body
      .split("\n")
      .slice(
        body.split("\n").findIndex((line) => line.includes("MAC address:")) + 1
      );
    let eventData = {};
    let currentEvent = null;

    bodySections.forEach((section) => {
      if (section.trim() === "") return;

      if (section.match(/^[A-Za-z ]+:/)) {
        currentEvent = section.trim();
        eventData[currentEvent] = "";
      } else if (currentEvent) {
        eventData[currentEvent] += section.trim() + " ";
      }
    });

    await EventsSamsung.create({
      name: senderName,
      macAddress: macAddress,
      eventName: JSON.stringify(eventData),
      dateTime:  parsedEmail.date,
    });
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
      const senderName = senderInfo.match(/^(.*?)\s*</)[1].replace(/"/g, "");

      if (subject.includes("SDR-B73303")) {
        await processSamsungEmail(parsedEmail);
      } else if (subject.includes("TEST MESSAGE FROM:")) {
        await TestHv.create({
          name: senderName,
          message: body,
          date: emailDate,
        });
      } else if (subject.includes("Embedded Net DVR")) {
        await EventHv.create({
          name: senderName,
          eventType: extractDataFromBody(body, /EVENT TYPE:\s*(.*)/),
          eventTime:
            new Date(
              extractDataFromBody(body, /EVENT TIME:\s*(.*)/).replace(",", " ")
            ) || null,
          dvrName: extractDataFromBody(body, /DVR NAME:\s*(.*)/),
          dvrSerialNumber: extractDataFromBody(body, /DVR S\/N:\s*(.*)/),
          cameraName: extractDataFromBody(body, /CAMERA NAME\(NUM\):\s*(.*)/),
        });
      } else {
        console.log("Correo no procesado:", subject);
      }

      await markMessageAsRead(uid);
    }
    console.log("Correos procesados y guardados correctamente.");
  } catch (error) {
    console.error("Error al procesar y guardar correos:", error);
  }
};

module.exports = { readAndProcessUnreadEmails };
