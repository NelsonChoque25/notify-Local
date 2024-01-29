const BcpAlert = require("../../models/teleservices/BcpAlert");
const BcpNotification = require("../../models/teleservices/BcpNotification");
const BcpOwnAccount = require("../../models/teleservices/BcpOwnAccount");
const CncBbva = require("../../models/teleservices/CncBbva");
const InterbankCompany = require("../../models/teleservices/InterbankCompany");

getBcpAlert = async (req, res) => {
  try {
    const events = await BcpAlert.findAll();
    return res.json(events);
  } catch (error) {
    console.error("Error al obtener los eventos BCP Alerts:", error);
    res.status(500).send("Error al obtener los eventos BCP Alerts");
  }
};

getBcpNotification = async (req, res) => {
  try {
    const events = await BcpNotification.findAll();
    return res.json(events);
  } catch (error) {
    console.error("Error al obtener los eventos BCP Notificaciones:", error);
    res.status(500).send("Error al obtener los eventos BCP Notificaciones");
  }
};

getBcpOwnAccount = async (req, res) => {
  try {
    const events = await BcpOwnAccount.findAll();
    return res.json(events);
  } catch (error) {
    console.error("Error al obtener los eventos BCP OwnAccount:", error);
    res.status(500).send("Error al obtener los eventos BCP OwnAccount");
  }
};

getCncBbva = async (req, res) => {
  try {
    const events = await CncBbva.findAll();
    return res.json(events);
  } catch (error) {
    console.error("Error al obtener los eventos BBVA:", error);
    res.status(500).send("Error al obtener los eventos BBVA");
  }
};

getInterbankCompany = async (req, res) => {
  try {
    const events = await InterbankCompany.findAll();
    return res.json(events);
  } catch (error) {
    console.error("Error al obtener los eventos Interbank:", error);
    res.status(500).send("Error al obtener los eventos Interbank");
  }
};

module.exports = { getBcpAlert, getBcpNotification, getBcpOwnAccount, getCncBbva, getInterbankCompany };