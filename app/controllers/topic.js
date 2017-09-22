const Topic = require('../models/Topic');

const getAll = async (ctx, next) => {
  const topics = await Topic.find({})
    .populate('poem')
    .exec();
  ctx.body = { topics };
  await next();
};

const getOne = async (ctx, next) => {
  const topic = await Topic.findById(ctx.params.id);
  ctx.body = { topic };
  await next();
};

module.exports = {
  getAll,
  getOne,
};
