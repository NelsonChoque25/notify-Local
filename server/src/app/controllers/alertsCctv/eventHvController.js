const EventHv = require("../../models/alertCctv/EventHv");

getEvents = async (req, res) => {
  try {
    const events = await EventHv.findAll();
    return res.json(events);
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    res.status(500).send("Error al obtener los eventos");
  }
};

module.exports = {
  getEvents,
};
