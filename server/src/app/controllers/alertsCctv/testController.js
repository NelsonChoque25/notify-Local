const TestSamsung = require("../../models/alertCctv/TestSamsung");
const TestHv = require("../../models/alertCctv/TestHv");

const getTestHv = async (req, res) => {
  try {
    const tests = await TestHv.findAll();
    res.status(200).json(tests);
  } catch (error) {
    console.error("Error al obtener los datos de Test:", error);
    res.status(500).send("Error al obtener los datos de Test.");
  }
};

const getCountOfTestHv = async (req, res) => {
  try {
    const count = await TestHv.count();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error al obtener la cantidad de Test:", error);
    res.status(500).send("Error al obtener la cantidad de Test.");
  }
};

const getTestSamsung = async (req, res) => {
  try {
    const tests = await TestSamsung.findAll();
    res.status(200).json(tests);
  } catch (error) {
    console.error("Error al obtener los datos de Test:", error);
    res.status(500).send("Error al obtener los datos de Test.");
  }
};

const getCountOfTestSamsung = async (req, res) => {
  try {
    const count = await TestSamsung.count();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error al obtener la cantidad de Test:", error);
    res.status(500).send("Error al obtener la cantidad de Test.");
  }
};

module.exports = {
  getTestHv,
  getCountOfTestHv,
  getTestSamsung,
  getCountOfTestSamsung,
};
