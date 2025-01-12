const express = require('express');
const { getArtists, getArtistById, addArtist, getArtistSongs, deleteArtist, updateArtist } = require('./controllers/artist');
const { getSongs, addSong, deleteSong, updateSong } =  require('./controllers/song');
const router = express.Router();

//artist
router.get('/artists', getArtists);
router.get('/artists/:id', getArtistById);
router.put("/artists/:id", updateArtist);
router.post('/artists', addArtist);
router.get('/artists/:id/songs', getArtistSongs);
router.delete('/artists/:id', deleteArtist);

//songs
router.get('/songs', getSongs);
router.post('/songs', addSong);
router.delete('/songs/:id', deleteSong);
router.put("/songs/:id", updateSong);

module.exports = router;