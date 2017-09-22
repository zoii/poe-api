const Poem = require('../models/Poem');

const getAll = async (ctx, next) => {
  const poems = await Poem.find({}).exec();
  ctx.body = { poems };
  await next();
};

const getOne = async (ctx, next) => {
  const poem = await Poem.findById(ctx.params.id);
  ctx.body = { poem };
  await next();
};

const getByDynasty = async (ctx, next) => {
  const poems = await Poem.findById(ctx.params.dynastyId);
  ctx.body = { poems };
  await next();
};

const getByType = async (ctx, next) => {
  const poems = await Poem.findById(ctx.params.typeId);
  ctx.body = { poems };
  await next();
};

const getByPoet = async (ctx, next) => {
  const poems = await Poem.findById(ctx.params.poetId);
  ctx.body = { poems };
  await next();
};

module.exports = {
  getAll,
  getOne,
  getByDynasty,
  getByType,
  getByPoet,
};
