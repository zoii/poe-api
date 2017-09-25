const extractNumber = string => string && string.replace(/[^0-9]/ig, '');
module.exports = {
  extractNumber,
};
