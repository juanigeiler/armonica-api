const express = require('express');
const { getArtists, getArtistById, addArtist, getArtistSongs, deleteArtist, updateArtist } = require('./controllers/artist');
const { getSongs, addSong, deleteSong, updateSong } =  require('./controllers/song');
const { register, login, verifyToken } = require('./controllers/auth');
const { authenticateToken } = require('./middleware/auth');

const router = express.Router();

// Auth routes (public)
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/verify', authenticateToken, verifyToken);

//artist
router.get('/artists', authenticateToken, getArtists);
router.get('/artists/:id', authenticateToken, getArtistById);
router.put("/artists/:id", authenticateToken, updateArtist);
router.post('/artists', authenticateToken, addArtist);
router.get('/artists/:id/songs', authenticateToken, getArtistSongs);
router.delete('/artists/:id', authenticateToken, deleteArtist);

//songs
router.get('/songs', authenticateToken, getSongs);
router.post('/songs', authenticateToken,addSong);
router.delete('/songs/:id', authenticateToken, deleteSong);
router.put("/songs/:id", authenticateToken, updateSong);

module.exports = router;