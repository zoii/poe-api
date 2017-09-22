const Poet = require('../models/Poet');

const getAll = async (ctx, next) => {
  const poets = await Poet.find({})
    .populate('poem')
    .exec();
  ctx.body = { poets };
  await next();
};

const getOne = async (ctx, next) => {
  const poet = await Poet.findById(ctx.params.id);
  ctx.body = { poet };
  await next();
};

module.exports = {
  getAll,
  getOne,
};
