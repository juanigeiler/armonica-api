const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  album: { type: String, required: true },
  key: { type: String, required: true },
  difficulty: { type: Number, required: true },
  spotify_url: { type: String, required: true },
  tabs: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
});

module.exports = mongoose.model('Song', songSchema);