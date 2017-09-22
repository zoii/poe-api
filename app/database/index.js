const mongoose = require('mongoose');
const CONST = require('../constants');

mongoose.Promise = global.Promise;

const connect = (uri = `mongodb://localhost:27017/${CONST.APP}`) => (
  new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', (error) => { console.log(error); reject(error); })
      .on('close', () => console.log('Database connection closed.'))
      .once('openUri', () => resolve(mongoose.connections[0]));

    mongoose.connect(uri, { useMongoClient: true });
    return resolve(mongoose.connections[0]);
  })
);

const disconnect = () => {
  mongoose.connection.disconnect();
};

module.exports = {
  connect,
  disconnect,
};
