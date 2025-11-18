require('dotenv').config();
const express = require('express');

// Utils
const pool = require('./utils/database');
const idGenerator = require('./utils/idGenerator');

// Repositories
const AlbumRepository = require('./repositories/AlbumRepository');
const SongRepository = require('./repositories/SongRepository');

// Services
const AlbumService = require('./services/AlbumService');
const SongService = require('./services/SongService');

// Controllers
const AlbumController = require('./controllers/AlbumController');
const SongController = require('./controllers/SongController');

// Routes
const createAlbumRoutes = require('./routes/albumRoutes');
const createSongRoutes = require('./routes/songRoutes');

// Middlewares
const errorHandler = require('./middlewares/errorHandler');

// Repository
const albumRepository = new AlbumRepository(pool);
const songRepository = new SongRepository(pool);

// Service
const albumService = new AlbumService(albumRepository, idGenerator);
const songService = new SongService(songRepository, idGenerator);

// Controller
const albumController = new AlbumController(albumService);
const songController = new SongController(songService);

const app = express();
app.use(express.json());

// Routes
app.use(createAlbumRoutes(albumController));
app.use(createSongRoutes(songController));

app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Resource tidak ditemukan',
  });
});

app.use(errorHandler);

module.exports = app;