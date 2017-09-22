const mongoose = require('mongoose');

const TopicSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  poems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poem',
  },
  like: {
    type: Number,
  },
});

module.exports = mongoose.model('Topic', TopicSchema);
