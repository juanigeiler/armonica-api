const express = require('express');
const { getArtists, getArtistById, addArtist, getArtistSongs, deleteArtist, updateArtist } = require('./controllers/artist');
const { getSongs, addSong, deleteSong, updateSong } =  require('./controllers/song');
const { register, login, verifyToken } = require('./controllers/auth');
const { authenticateToken, optionalAuth } = require('./middleware/auth');

const router = express.Router();

// Auth routes (public)
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/verify', authenticateToken, verifyToken);

//artist - GET routes are public, POST/PUT/DELETE require authentication
router.get('/artists', getArtists);
router.get('/artists/:id', getArtistById);
router.get('/artists/:id/songs', getArtistSongs);
router.post('/artists', authenticateToken, addArtist);
router.put("/artists/:id", authenticateToken, updateArtist);
router.delete('/artists/:id', authenticateToken, deleteArtist);

//songs - GET routes are public, POST/PUT/DELETE require authentication
router.get('/songs', getSongs);
router.post('/songs', authenticateToken, addSong);
router.put("/songs/:id", authenticateToken, updateSong);
router.delete('/songs/:id', authenticateToken, deleteSong);

module.exports = router;