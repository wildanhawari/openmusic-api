require('dotenv').config();
const express = require('express');
const path = require('path');

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
const StorageService = require('./services/StorageService');
const ProducerService = require('./services/ProducerService');
const ExportService = require('./services/ExportService');
const CacheService = require('./services/CacheService');

// Controllers
const AlbumController = require('./controllers/AlbumController');
const SongController = require('./controllers/SongController');
const UserController = require('./controllers/UserController');
const AuthenticationController = require('./controllers/AuthenticationController');
const PlaylistController = require('./controllers/PlaylistController');
const CollaborationController = require('./controllers/CollaborationController');
const ExportController = require('./controllers/ExportController');

// Validator
const UploadValidator = require('./validators/UploadValidator');

// Routes
const createAlbumRoutes = require('./routes/albumRoutes');
const createSongRoutes = require('./routes/songRoutes');
const createUserRoutes = require('./routes/userRoutes');
const createAuthenticationRoutes = require('./routes/authenticationRoutes');
const createPlaylistRoutes = require('./routes/playlistRoutes');
const createCollaborationRoutes = require('./routes/collaborationRoutes');
const createExportRoutes = require('./routes/exportRoutes');

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
const cacheService = new CacheService();
const albumService = new AlbumService(albumRepository, idGenerator, cacheService);
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
const storageService = new StorageService(path.resolve(__dirname, 'api/uploads/file/images'));
const producerService = new ProducerService();
const exportService = new ExportService(producerService, playlistService);

playlistService.setCollaborationService(collaborationService);

// Controller
const albumController = new AlbumController(albumService, storageService, UploadValidator);
const songController = new SongController(songService);
const userController = new UserController(userService);
const authenticationController = new AuthenticationController(authenticationService);
const playlistController = new PlaylistController(playlistService);
const collaborationController = new CollaborationController(collaborationService);
const exportController = new ExportController(exportService);

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, 'api/uploads/file')));

// Routes
app.use(createAlbumRoutes(albumController));
app.use(createSongRoutes(songController));
app.use(createUserRoutes(userController));
app.use(createAuthenticationRoutes(authenticationController));
app.use(createPlaylistRoutes(playlistController));
app.use(createCollaborationRoutes(collaborationController));
app.use(createExportRoutes(exportController));

app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Resource tidak ditemukan',
  });
});

app.use(errorHandler);

module.exports = app;