const osmosis = require('osmosis');
const { isEmpty, find, unionBy } = require('lodash');
const utils = require('../utils');
const Dynasty = require('../models/Dynasty');
const PoemType = require('../models/PoemType');

const fetchPoem = async (poet) => {
  let count = 0;
  let hasMore = !1;
  let list = [];
  const dynasties = await Dynasty.find({});
  const types = await PoemType.find({});
  const fetch = new Promise((resolved, rejected) => {
    const instances = new osmosis.get(`http://so.gushiwen.org/author_${poet.poeId}.aspx`);
    instances.run();
    instances
      .find('.left .sons')
      .set({
        title: '.cont p[1] > a > b',
        dynasty: '.cont .source a[1]',
        poet: '.cont .source a[2]',
        // content: '.cont .contson[1]',
        type: ['.tag a'],
      })
      .data((listing) => {
      })
      .then((ctx, item) => {
        list.push(item);
        // list = unionBy(list, 'title');
      })
      .find('.title[style=" text-align:center; height:40px; line-height:40px;"] > a')
      .delay(0.2)
      .follow('@href')
      .then((context) => {
        count += 1;
        hasMore = !0;
        
        instances.set('test', '21')
          .data((data) => {
            console.log(data);
          });
        console.log('打开更多页面');
        console.log(context.request.href);
          
        // resolved();
      })
      .done(() => {
        // console.log(list);
        if (hasMore) {
          return;
        }
        console.log('没有更多的时候执行');
      });
  });
  return fetch;
};

module.exports = fetchPoem;

