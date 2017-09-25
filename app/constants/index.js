const APP = 'poe-api';
const API_PORT = 3000;

const OSM_CONFIG = {
  DYNASTY: {
    uri: 'http://so.gushiwen.org/type.aspx',
    selectors: '.right > .sons[2] .cont a',
    filter: 'name',
  },
  POEM_TYPE: {
    uri: 'http://so.gushiwen.org/shiwen/tags.aspx',
    selectors: '.bookcont > span',
    filter: 'name',
  },
  POET: {
    uri: 'http://so.gushiwen.org/authors/Default.aspx',
  },
};

module.exports = {
  APP,
  API_PORT,
  OSM_CONFIG,
};
