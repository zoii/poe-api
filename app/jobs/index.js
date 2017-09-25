const { isEmpty, flatten } = require('lodash');
const moment = require('moment');
const mapLimit = require('promise-maplimit');
const CONST = require('../constants/');
const Dynasty = require('../models/Dynasty');
const Poet = require('../models/Poet');
const PoemType = require('../models/PoemType');
const fetchAttributes = require('./fetchAttributes');
const fetchPoet = require('./fetchPoet');


const syncAttributes = async (option, model) => {
  const data = await fetchAttributes(option);
  await model.insertMany(data);
};

const syncPoet = async () => {
  const lap = moment();
  // const dynasties = await Dynasty.find({});
  const dynasties = [{ name: '五代' }];
  console.log(`✨================================> 📦  开始获取${lap.format('LL')}   📦 <================================✨`);
  try {
    let poets = await mapLimit(dynasties, 5, async (dynasty) => {
      console.log(`✨================================> 📦  开始获取${dynasty.name}诗人   📦 <================================✨`);
      const data = await fetchPoet(dynasty.name);
      return data;
    });
    poets = flatten(poets);
    console.log(`=========poets.length:${poets.length}==========`);
    // await Poet.insertMany(poets);
  } catch (err) {
    console.log(err);
  }
  console.log(`✨================================> 花费时间 ${moment().diff(lap, 'milliseconds')}ms. <================================✨`);
};

const syncData = async () => {
  try {
    const dynasties = await Dynasty.find({});
    const poets = await Poet.find({});
    console.log(poets.length);
    const poemTypes = await PoemType.find({});
    syncPoet();
    // if (isEmpty(poets)) { syncPoet(); }
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
