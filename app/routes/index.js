const Router = require('koa-router');
const dynasty = require('../controllers/dynasty');
const poemType = require('../controllers/poemType');
const poet = require('../controllers/poet');
const topic = require('../controllers/topic');
const poem = require('../controllers/poem');

const router = new Router({ prefix: '/api' });

router
  .get('/dynastys', dynasty.getAll)
  .get('/poemType', poemType.getAll)
  .get('/topics', topic.getAll)
  .get('/topics/:id', topic.getOne)
  .get('/poets', poet.getAll)
  .get('/poets/:id', poet.getOne)
  .get('/poems', poem.getAll)
  .get('/poems/:id', poem.getOne)
  .get('/poems/:dynastyId', poem.getByDynasty)
  .get('/poems/:poetId', poem.getByPoet)
  .get('/poems/:typeId', poem.getByType);

module.exports = router;
