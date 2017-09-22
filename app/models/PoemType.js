const mongoose = require('mongoose');

const TypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  poems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poem',
  },
});

module.exports = mongoose.model('Type', TypeSchema);
