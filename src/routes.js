const express = require('express');
const { getArtists, getArtistById, addArtist, getArtistSongs, deleteArtist } = require('./controllers/artist');
const { getSongs, addSong, getSongById, deleteSong } =  require('./controllers/song');
const router = express.Router();

//artist
router.get('/artists', getArtists);
router.get('/artists/:id', getArtistById);
router.post('/artists', addArtist);
router.get('/artists/:id/songs', getArtistSongs);
router.delete('/artists/:id', deleteArtist);

//songs
router.get('/songs', getSongs);
router.post('/songs', addSong);
router.get('/songs/:id', getSongById);
router.delete('/songs/:id', deleteSong);

module.exports = router;