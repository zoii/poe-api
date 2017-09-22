const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const responseParser = require('./middlewares/response-parser');
const CONST = require('./constants');
const jobs = require('./jobs');
const database = require('./database');
const config = require('./config');
const router = require('./routes');

const app = new Koa();
app.use(logger());
app.use(bodyParser());
app.use(responseParser());
app.use(router.routes());

(async () => {
  try {
    // console.log(db);
    const db = await database.connect(config.MONGODB_URI);
    console.log(`Connected to database ${db.host}:${db.port}/${db.name}`);
  } catch (error) {
    console.log(error);
    console.error('Unable to connect to database');
  }
  await app.listen(CONST.API_PORT);
  console.log(`API Server is running on http://localhost:${CONST.API_PORT}`);
  jobs.start();
})();
