const osmosis = require('osmosis');
const { isEmpty, find } = require('lodash');
const utils = require('../utils');
const Dynasty = require('../models/Dynasty');
const PoemType = require('../models/PoemType');

const fetchPoem = async (id) => {
  const list = [];
  let page = 0;
  let totalPage = 0;
  const limit = 10;
  const dynasties = await Dynasty.find({});
  const types = await PoemType.find({});
  const fetch = new Promise((resolved, rejected) => {
    osmosis
      .get(`http://so.gushiwen.org/author_${id}.aspx`)
      .if('.right !~ .title')
      .then(() => {
        osmosis
          .get(`http://so.gushiwen.org//authors/authorsw_${id}A1.aspx`)
          .paginate('.pages span[style="color:#65645F; background-color:#E1E0C7; border:0px; width:auto;"] !+ a[style="width:60px;"]')
          .then(() => {
            page += 1;
          })
          .find('.pages span[style="color:#65645F; background-color:#E1E0C7; border:0px; width:auto;"]')
          .find('.sons')
          .set({
            title: '.cont p[1] > a > b',
            dynasty: '.cont .source a[1]',
            poet: '.cont .source a[2]',
            // content: '.cont .contson',
            type: ['.tag a'],
          })
          .set([
            osmosis.get(`http://so.gushiwen.org/shiwen2017/ajaxshiwencont.aspx?id=${72403}&value=yi`)
              .set('translation', ['p span[1]']),
          ])
          .data((listing) => {
            console.log(listing);
            // totalPage = Math.ceil(utils.extractNumber(listing.total) / limit);
            // // 关联到朝代表中
            // const dynasty = find(dynasties, ['name', listing.dynasty]);
            // if (dynasty) {
            //   listing.dynasty = dynasty._id; // eslint-disable-line
            // }

            // 关联类型
            // listing.type.forEach((item, index) => {
            //   const type = find(types, ['name', item]);
            //   if (type) {
            //     listing.type[index] = type._id; // eslint-disable-line
            //   }
            // });
          })
          .then((ctx, item) => {
            // if (!isEmpty(item)) { list.push(item); }
            // if (totalPage === page && ctx.last) {
            //   console.log(list);
            //   resolved(list);
            // }
          })
          .log(console.log)
          .error((error) => {
            console.log(`❗️❗️❗️❗️❗️❗️❗️❗️❗️错误信息：${error}❗️❗️❗️❗️❗️❗️❗️❗️❗️`);
            rejected(error);
          })
          .debug(console.log);
      })
      // .click('sons .cont .yizhu img[1]')
      // .then((window) => {
      //   console.log(window);
        // var ajax = window.document.querySelector("#ajaxContent");
        // if (ajax.textContent.length > 0) {
            // this.log("ajax loaded");
        // }
      // })
  });
  return fetch;
};

module.exports = fetchPoem;

