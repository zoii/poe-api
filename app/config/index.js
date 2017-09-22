const CONST = require('../constants');

const PRODUCTION = (process.env.NODE_ENV === 'production');
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${CONST.APP}`;

module.exports = {
  PRODUCTION,
  MONGODB_URI,
};
