const mongoose = require('mongoose');

const PoemSchema = mongoose.Schema({
  title: {
    type: String,
  },
  content: [{
    text: String,
  }],
  poet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poet',
  },
  type: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PoemType',
  }],
  dynasty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dynasty',
  },
  like: {
    type: Number,
  },
  translation: [{
    text: String,
  }],
  note: [{
    text: String,
  }],
  reference: [{
    text: String,
  }],
});

module.exports = mongoose.model('Poem', PoemSchema);
