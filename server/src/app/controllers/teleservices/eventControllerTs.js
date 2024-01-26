const BcpAlert = require("../../models/teleservices/BcpAlert");

getBcpAlert = async (req, res) => {
  try {
    const events = await BcpAlert.findAll();
    return res.json(events);
  } catch (error) {
    console.error("Error al obtener los eventos BCP Alerts:", error);
    res.status(500).send("Error al obtener los eventos BCP Alerts");
  }
};

module.exports = { getBcpAlert };