const { isEmpty, flatten } = require('lodash');
const moment = require('moment');
const mapLimit = require('promise-maplimit');
const CONST = require('../constants/');
const Dynasty = require('../models/Dynasty');
const Poet = require('../models/Poet');
const PoemType = require('../models/PoemType');
const fetchAttributes = require('./fetchAttributes');
const fetchPoet = require('./fetchPoet');
const fetchPoem = require('./fetchPoem');


const syncAttributes = async (option, model) => {
  try {
    const data = await fetchAttributes(option);
    await model.insertMany(data);
  } catch (err) {
    console.log(err);
  }
};

const syncPoet = async () => {
  const lap = moment();
  const dynasties = await Dynasty.find({});
  console.log(`✨================================> 📦  开始获取${lap.format('LL')}   📦 <================================✨`);
  try {
    let poets = await mapLimit(dynasties, 5, async (dynasty) => {
      console.log(`✨================================> 📦  开始获取${dynasty.name}诗人   📦 <================================✨`);
      const data = await fetchPoet(dynasty.name);
      return data;
    });
    poets = flatten(poets);
    console.log(`=========poets.length:${poets.length}==========`);
    await Poet.insertMany(poets);
  } catch (err) {
    console.log(err);
  }
  console.log(`✨================================> 花费时间 ${moment().diff(lap, 'milliseconds')}ms. <================================✨`);
};

const syncPoem = async () => {
  const lap = moment();
  // const poets = await Poet.find({});
  const poets = [
    {
      _id: '59c9ef7002d0c948845d3d77',
      poeId: '238',
      name: '屈原',
    },
  // {
  //   _id: '59c9ef7002d0c948845d3d78',
  //   name: '左丘明',
  //   poeId: '384',
  // },
  // {
  //   _id: '59c9ef7002d0c948845d3d79',
  //   name: '韩非',
  //   poeId: '404',
  // },
    // {
    //   _id: '59c9ef7002d0c948845d3d77',
    //   poeId: '796',
    //   name: '李撕',
    // },
  ];
  console.log(`✨================================> 📦  开始获取${lap.format('LL')}   📦 <================================✨`);
  try {
    let poems = await mapLimit(poets, 1, async (poet) => {
      console.log(`✨================================> 📦  开始获取${poet.name}的诗词   📦 <================================✨`);
      const data = await fetchPoem(poet);
      return data;
    });
    poems = flatten(poems);
    console.log(`=========poems.length:${poems.length}==========`);
    // await Poet.insertMany(poems);
  } catch (err) {
    console.log(err);
  }
  console.log(`✨================================> 花费时间 ${moment().diff(lap, 'milliseconds')}ms. <================================✨`);
};

const syncData = async () => {
  try {
    const dynasties = await Dynasty.find({});
    const poemTypes = await PoemType.find({});
    const poets = await Poet.find({});
    if (isEmpty(dynasties)) { syncAttributes(CONST.OSM_CONFIG.DYNASTY, Dynasty); }
    if (isEmpty(poemTypes)) { syncAttributes(CONST.OSM_CONFIG.POEM_TYPE, PoemType); }
    if (isEmpty(poets)) { syncPoet(); }
    syncPoem();
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
