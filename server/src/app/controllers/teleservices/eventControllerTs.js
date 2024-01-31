const BcpAlert = require("../../models/teleservices/BcpAlert");
const BcpNotification = require("../../models/teleservices/BcpNotification");
const BcpOwnAccount = require("../../models/teleservices/BcpOwnAccount");
const CncBbva = require("../../models/teleservices/CncBbva");
const InterbankCompany = require("../../models/teleservices/InterbankCompany");
const { Sequelize } = require("sequelize");
const { Op } = Sequelize;



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

//Funcion
getBcpAlertByFilters = async (req, res) => {
  try {
    //const { orderingCompany, beneficiary, amount, datetime } = req.query;
    const { orderingCompany, beneficiary, minAmount, maxAmount, fromDate, toDate } = req.query;
    const conditions = {};
    
    if (orderingCompany) {
      conditions.orderingCompany = orderingCompany;
    }
    
    if (beneficiary) {
      conditions.beneficiary = beneficiary;
    }
    
    if (minAmount && maxAmount) {
      conditions.amount = {
        [Op.between]: [minAmount, maxAmount]
      };
    }

    if (fromDate && toDate) {
      conditions.dateTime = {
        [Op.between]: [new Date(fromDate), new Date(toDate)],
      };
    }

    const events = await BcpAlert.findAll({
      where: conditions,
    });

    return res.json(events);
  } catch (error) {
    console.error("Error al obtener los eventos BCP Alerts por filtros:", error);
    res.status(500).send("Error al obtener los eventos BCP Alerts por filtros");
  }
};


module.exports = { getBcpAlert, getBcpNotification, getBcpOwnAccount, getCncBbva, getInterbankCompany,getBcpAlertByFilters };