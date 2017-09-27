const osmosis = require('osmosis');
const { find, filter } = require('lodash');
const utils = require('../utils');
const CONST = require('../constants');
const { isEmpty } = require('lodash');
const Dynasty = require('../models/Dynasty');

const fetchPoet = async (keyword) => {
  const list = [];
  let totalPage = 0;
  let page = 0;
  const limit = 10;
  const dynasties = await Dynasty.find({});
  const fetch = await new Promise((resolved, rejected) => {
    osmosis.get(CONST.OSM_CONFIG.POET.uri, { c: keyword, p: 1 })
      .paginate('.pages span[style="color:#65645F; background-color:#E1E0C7; border:0px; width:auto;"] !+ a[style="width:60px;"]')
      .then((ctx) => {
        page = parseInt(ctx.request.params.p, 10);
      })
      .select('.pages span[style="color:#65645F; background-color:#E1E0C7; border:0px; width:auto;"]')
      .set('total')
      .find('.sonspic > .cont')
      .set({
        image: '.divimg img@src',
        page: 'p[1] > a@href',
        name: 'p[1] > a > b',
        introduction: 'p[2]',
      })
      .data((listing) => {
        totalPage = Math.ceil(utils.extractNumber(listing.total) / limit);
        if (totalPage > 0) {
          listing.total = null; // eslint-disable-line
        }
        listing.poetId = utils.extractNumber(listing.page); // eslint-disable-line
        // 将作者关联到朝代中
        const dynasty = find(dynasties, ['name', keyword]);
        if (dynasty) {
          listing.dynasty = dynasty._id; // eslint-disable-line
        }
      })
      .then((ctx, item) => {
        if (!isEmpty(item)) { list.push(item); }
        if (totalPage === page && ctx.last) { resolved(list); }
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
