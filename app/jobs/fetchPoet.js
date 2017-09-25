const osmosis = require('osmosis');
const { find } = require('lodash');
const utils = require('../utils');
const CONST = require('../constants');
const { isEmpty } = require('lodash');
const Dynasty = require('../models/Dynasty');


const fetchPoet = async (keyword) => {
  const list = [];
  let totalPage = 0;
  const dynasties = await Dynasty.find({});
  const fetch = await new Promise((resolved, rejected) => {
    osmosis
      .get(CONST.OSM_CONFIG.POET.uri, { c: keyword, p: 1 })
      .paginate('.pages span[style="color:#65645F; background-color:#E1E0C7; border:0px; width:auto;"] !+ a[style="width:60px;"]', '.pages span[style="color:#65645F; background-color:#E1E0C7; border:0px; width:auto;"]')
      .then((ctx) => {
        totalPage = ctx.request.count;
      })
      .find('.sonspic > .cont')
      .set({
        image: '.divimg img@src',
        page: 'p[1] > a@href',
        name: 'p[1] > a > b',
        introduction: 'p[2]',
      })
      .data((listing) => {
        listing.poetId = utils.extractNumber(listing.page); // eslint-disable-line
        // 将作者关联到朝代中
        const dynasty = find(dynasties, ['name', keyword]);
        if (dynasty) {
          listing.dynasty = dynasty._id; // eslint-disable-line
        }
      })
      .then((ctx, item) => {
        // console.log(ctx);
        if (!isEmpty(item)) { list.push(item); }
        if (totalPage > 0) { resolved(list); }
      })
      .log(console.log)
      .error((error) => {
        console.log(`❗️❗️❗️❗️❗️❗️❗️❗️❗️错误信息：${error}❗️❗️❗️❗️❗️❗️❗️❗️❗️`);
        rejected(error);
      })
      .debug(console.log);
  });
  return fetch;
};

module.exports = fetchPoet;
