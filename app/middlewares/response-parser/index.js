const renameKeys = require('deep-rename-keys');

const responseParser = () => async (ctx, next) => {
  if (ctx.errors) {
    ctx.body = {
      errors: ctx.errors,
      success: false,
    };
  } else if (ctx.body) {
    const processId = key => (key === '_id' ? 'id' : key);
    ctx.body = JSON.parse(JSON.stringify(ctx.body));
    ctx.body = renameKeys(ctx.body, processId);
    ctx.body = Object.assign(ctx.body, { success: true });
  }
  await next();
};

module.exports = responseParser;
