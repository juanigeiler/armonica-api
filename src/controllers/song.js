const Song = require('../models/Song');
const Artist = require('../models/Artist');

const getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching songs' });
    }
};

const addSong = async (req, res) => {
    try {
        const { artistId, ...songData } = req.body;
        const artist = await Artist.findById(artistId);
        if (!artist) return res.status(404).json({ error: 'Artist not found' });

        const newSong = new Song({ ...songData, artist: artistId });
        await newSong.save();

        artist.songs.push(newSong._id);
        await artist.save();

        res.status(201).json(newSong);
    } catch (err) {
        res.status(400).json({ error: 'Error adding song' + err });
    }
};

const getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id).populate('artist');
        if (!song) return res.status(404).json({ error: 'Song not found' });
        res.json(song);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching song' });
    }
};

const deleteSong = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ error: 'Song not found' });
        await song.deleteOne();
        res.status(204).json({ message: 'Song deleted successfully', artistId: req.params.id });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting song' + err });
    }
};

module.exports = {
    getSongs,
    addSong,
    getSongById,
    deleteSong
};