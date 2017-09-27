const mongoose = require('mongoose');

const DynastySchema = mongoose.Schema({
  originalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poem',
  },
  title: {
    type: String,
  },
  content: [{
    text: String,
  }],
});

module.exports = mongoose.model('Dynasty', DynastySchema);
