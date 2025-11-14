const { nanoid } = require('nanoid');

const generateAlbumId = () => `album-${nanoid(16)}`;
const generateSongId = () => `song-${nanoid(16)}`;

module.exports = { generateAlbumId, generateSongId };