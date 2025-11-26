/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createType('activity_action', ['add', 'delete']);

  pgm.createTable('activities', {
    id: { type: 'varchar(50)', primaryKey: true },
    playlistId: { type: 'varchar(50)', references: 'playlists(id)', onDelete: 'CASCADE' },
    userId: { type: 'varchar(50)', references: 'users(id)', notNull: true },
    songId: { type: 'varchar(50)', references: 'songs(id)', notNull: true },
    action: { type: 'activity_action', notNull: true },
    time: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('activities');
  pgm.dropType('activity_action');
};
