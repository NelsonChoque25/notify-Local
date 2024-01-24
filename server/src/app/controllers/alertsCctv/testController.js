const Test = require("../../models/alertCctv/TestHv");

const getAllTests = async (req, res) => {
  try {
    const tests = await Test.findAll();
    res.status(200).json(tests);
  } catch (error) {
    console.error("Error al obtener los datos de Test:", error);
    res.status(500).send("Error al obtener los datos de Test.");
  }
};

const getCountOfTests = async (req, res) => {
  try {
    const count = await Test.count();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error al obtener la cantidad de Test:", error);
    res.status(500).send("Error al obtener la cantidad de Test.");
  }
};



module.exports = { getAllTests, getCountOfTests };