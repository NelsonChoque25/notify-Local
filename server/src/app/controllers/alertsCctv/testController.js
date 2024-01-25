const TestSamsung = require("../../models/alertCctv/TestSamsung");
const TestHv = require("../../models/alertCctv/TestHv");
const sequelize = require("sequelize");

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

const removeDuplicateTestHv = async (req, res) => {
  try {
    const duplicates = await TestHv.findAll({
      attributes: ['name'],
      group: ['name'],
      having: sequelize.literal('COUNT(*) > 1'),
    });

    for (const duplicate of duplicates) {
      await TestHv.destroy({
        where: { name: duplicate.name },
        limit: duplicates.length - 1,
      });
    }

    res.status(200).json({ message: "Registros duplicados eliminados con éxito" });
  } catch (error) {
    console.error("Error al eliminar registros duplicados de Test Hikvision:", error);
    res.status(500).send("Error al eliminar registros duplicados de Test Hikvision.");
  }
};

module.exports = {
  getTestHv,
  getCountOfTestHv,
  getTestSamsung,
  getCountOfTestSamsung,
  removeDuplicateTestHv,
};
