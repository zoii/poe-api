const PoemType = require('../models/PoemType');

const getAll = async (ctx, next) => {
  const types = await PoemType.find({})
    .populate('poem')
    .exec();
  ctx.body = { types };
  await next();
};

module.exports = {
  getAll,
};
