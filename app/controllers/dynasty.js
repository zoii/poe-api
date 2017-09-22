const Dynasty = require('../models/Dynasty');

const getAll = async (ctx, next) => {
  const dynasties = await Dynasty.find({})
    .populate('poem')
    .exec();
  ctx.body = { dynasties };
  await next();
};

module.exports = {
  getAll,
};
