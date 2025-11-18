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
  pgm.createTable('songs', {
    id: { type: 'varchar(50)', primaryKey: true },
    title: { type: 'varchar(255)', notNull: true },
    year: { type: 'integer', notNull: true },
    genre: { type: 'varchar(100)', notNull: true },
    performer: { type: 'varchar(100)', notNull: true },
    duration: { type: 'integer', notNull: true },
    albumId: { type: 'varchar(50)', references: 'albums(id)', onDelete: 'CASCADE' },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => { pgm.dropTable('songs'); };
