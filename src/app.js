require('dotenv').config();
const express = require('express');

// Utils
const pool = require('./utils/database');
const idGenerator = require('./utils/idGenerator');
const tokenManager = require('./utils/tokenManager');

// Repositories
const AlbumRepository = require('./repositories/AlbumRepository');
const SongRepository = require('./repositories/SongRepository');
const UserRepository = require('./repositories/UserRepository');
const AuthenticationRepository = require('./repositories/AuthenticationRepository');
const PlaylistRepository = require('./repositories/PlaylistRepository');
const CollaborationRepository = require('./repositories/CollaborationRepository');
const ActivityRepository = require('./repositories/ActivityRepository');

// Services
const AlbumService = require('./services/AlbumService');
const SongService = require('./services/SongService');
const UserService = require('./services/UserService');
const AuthenticationService = require('./services/AuthenticationService');
const PlaylistService = require('./services/PlaylistService');
const CollaborationService = require('./services/CollaborationService');

// Controllers
const AlbumController = require('./controllers/AlbumController');
const SongController = require('./controllers/SongController');
const UserController = require('./controllers/UserController');
const AuthenticationController = require('./controllers/AuthenticationController');
const PlaylistController = require('./controllers/PlaylistController');
const CollaborationController = require('./controllers/CollaborationController');

// Routes
const createAlbumRoutes = require('./routes/albumRoutes');
const createSongRoutes = require('./routes/songRoutes');
const createUserRoutes = require('./routes/userRoutes');
const createAuthenticationRoutes = require('./routes/authenticationRoutes');
const createPlaylistRoutes = require('./routes/playlistRoutes');
const createCollaborationRoutes = require('./routes/collaborationRoutes');

// Middlewares
const errorHandler = require('./middlewares/errorHandler');

// Repository
const albumRepository = new AlbumRepository(pool);
const songRepository = new SongRepository(pool);
const userRepository = new UserRepository(pool);
const authenticationRepository = new AuthenticationRepository(pool);
const playlistRepository = new PlaylistRepository(pool);
const collaborationRepository = new CollaborationRepository(pool);
const activityRepository = new ActivityRepository(pool);

// Service
const albumService = new AlbumService(albumRepository, idGenerator);
const songService = new SongService(songRepository, idGenerator);
const userService = new UserService(userRepository, idGenerator);
const authenticationService = new AuthenticationService(
  authenticationRepository,
  userService,
  tokenManager
);
const playlistService = new PlaylistService(
  playlistRepository,
  activityRepository,
  idGenerator
);
const collaborationService = new CollaborationService(
  collaborationRepository,
  playlistService,
  userService
);

playlistService.setCollaborationService(collaborationService);

// Controller
const albumController = new AlbumController(albumService);
const songController = new SongController(songService);
const userController = new UserController(userService);
const authenticationController = new AuthenticationController(authenticationService);
const playlistController = new PlaylistController(playlistService);
const collaborationController = new CollaborationController(collaborationService);

const app = express();
app.use(express.json());

// Routes
app.use(createAlbumRoutes(albumController));
app.use(createSongRoutes(songController));
app.use(createUserRoutes(userController));
app.use(createAuthenticationRoutes(authenticationController));
app.use(createPlaylistRoutes(playlistController));
app.use(createCollaborationRoutes(collaborationController));

app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Resource tidak ditemukan',
  });
});

app.use(errorHandler);

module.exports = app;