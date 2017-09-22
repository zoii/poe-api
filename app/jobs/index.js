const { isEmpty, reject } = require('lodash');
const CONST = require('../constants/');
const Dynasty = require('../models/Dynasty');
const PoemType = require('../models/PoemType');
const fetchAttributes = require('./fetchAttributes');


const syncAttributes = async (option, model) => {
  const data = await fetchAttributes(option);
  await model.insertMany(data);
};

const syncData = async () => {
  try {
    const dynasties = await Dynasty.find({});
    const poemTypes = await PoemType.find({});
    if (isEmpty(dynasties)) { syncAttributes(CONST.OSM_CONFIG.DYNASTY, Dynasty); }
    if (isEmpty(poemTypes)) { syncAttributes(CONST.OSM_CONFIG.POEM_TYPE, PoemType); }
  } catch (err) {
    console.log(err);
  }
};

const start = () => {
  syncData();
};

module.exports = {
  start,
};
