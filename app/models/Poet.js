const mongoose = require('mongoose');

const PoetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
  },
  image: {
    type: String,
  },
  poems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poem',
  },
  dynasty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dynasty',
  },
  like: {
    type: Number,
  },
});

module.exports = mongoose.model('Poet', PoetSchema);
