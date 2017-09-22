const mongoose = require('mongoose');

const DynastySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Dynasty', DynastySchema);
