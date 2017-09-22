const osmosis = require('osmosis');
const { isEmpty } = require('lodash');

const fetchAttributes = (option = {}) => {
  const list = [];
  const fetch = new Promise((resolved, rejected) => {
    osmosis
      .get(option.uri)
      .find(option.selectors)
      .set(option.filter)
      .then((ctx, item) => {
        if (!isEmpty(item)) { list.push(item); }
        if (ctx.last) { resolved(list); }
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

module.exports = fetchAttributes;

