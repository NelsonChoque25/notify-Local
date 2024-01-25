const EventSamsung = require("../../models/alertCctv/EventSamsung");
const EventHv = require("../../models/alertCctv/EventHv");

getEventsHv = async (req, res) => {
  try {
    const events = await EventHv.findAll();
    return res.json(events);
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    res.status(500).send("Error al obtener los eventos");
  }
};

getEventsSamsung = async (req, res) => {
  try {
    const events = await EventSamsung.findAll();
    return res.json(events);
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    res.status(500).send("Error al obtener los eventos");
  }
}

getLastEventsHv = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5; 
  try {
    const events = await EventHv.findAll({
      limit: limit,
      order: [['createdAt', 'DESC']] 
    });
    return res.json(events);
  } catch (error) {
    console.error("Error al obtener los últimos eventos de EventHv:", error);
    res.status(500).send("Error al obtener los últimos eventos");
  }
};

getLastEventsSamsung = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5; 
  try {
    const events = await EventSamsung.findAll({
      limit: limit,
      order: [['createdAt', 'DESC']]
    });
    return res.json(events);
  } catch (error) {
    console.error("Error al obtener los últimos eventos de EventSamsung:", error);
    res.status(500).send("Error al obtener los últimos eventos");
  }
};

module.exports = {
  getEventsHv,
  getEventsSamsung,
  getLastEventsHv,
  getLastEventsSamsung
};
