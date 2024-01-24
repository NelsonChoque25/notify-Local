const EventSamsung = require("../models/alertCctv/EventSamsung");
const TestSamsung = require("../models/alertCctv/TestSamsung");
const { extractDataFromBody } = require("../utils/emailUtils");
const EventHv = require("../models/alertCctv/EventHv");
const TestHv = require("../models/alertCctv/TestHv");

// Procesar correos de Samsung
const processSamsungEmail = async (parsedEmail) => {
  const body = parsedEmail.text;
  const macAddress = extractDataFromBody(body, /MAC address:\s*(.*)/);
  const testMessage = "This testing E-mail";
  const senderInfo = parsedEmail.from.text;
  const senderName = senderInfo.match(/<([^>]*)>/)[1];

  if (body.includes(testMessage)) {
    await TestSamsung.create({
      name: senderName,
      macAddress: macAddress,
      eventName: "Test Email",
      message: testMessage,
      datetime: parsedEmail.date,
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

    await EventSamsung.create({
      name: senderName,
      macAddress: macAddress,
      eventName: JSON.stringify(eventData),
      dateTime: parsedEmail.date,
    });
  }
};

// Procesar correos de HV Test
const processTestHvEmail = async (parsedEmail, senderName) => {
  const body = parsedEmail.text;
  const emailDate = parsedEmail.date;

  await TestHv.create({
    name: senderName,
    message: body,
    date: emailDate,
  });
};

// Procesar correos de HV Events
const processEventHvEmail = async (parsedEmail, senderName) => {
  const body = parsedEmail.text;

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
};

module.exports = {
  processSamsungEmail,
  processTestHvEmail,
  processEventHvEmail,
};
