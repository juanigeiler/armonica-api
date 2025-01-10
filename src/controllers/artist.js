const Artist = require('../models/Artist');
const Song = require('../models/Song');

const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching artists' });
    }
};

const getArtistById = async (req, res) => {
    try {
      const artist = await Artist.findById(req.params.id).populate('songs');
      if (!artist) return res.status(404).json({ error: 'Artist not found' });
      res.json(artist);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching artist' });
    }
};

const addArtist = async (req, res) => {
    try {
        const { name, genre } = req.body;
        
        const newArtist = new Artist({ name, genre });
        await newArtist.save();
        res.status(201).json(newArtist);
    } catch (err) {
        res.status(400).json({ error: 'Error adding artist' + err });
    }
};

const getArtistSongs = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id).populate('songs');
        if (!artist) return res.status(404).json({ error: 'Artist not found' });
        res.json(artist.songs);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching artist songs' });
    }
};

const deleteArtist = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id).populate('songs');
        if (!artist) return res.status(404).json({ error: 'Artist not found' });
        if (artist.songs && artist.songs.length > 0) {
            await Song.deleteMany({ _id: { $in: artist.songs } });
        }
        await artist.deleteOne();
        res.status(204).json({ message: 'Artist deleted successfully', artistId: req.params.id });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting artist' + err });
    }
};

module.exports = {
    getArtists,
    getArtistById,
    addArtist,
    getArtistSongs,
    deleteArtist
};