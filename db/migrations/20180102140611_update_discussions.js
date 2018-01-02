/* eslint-disable */

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('discussions', function(table) {
      table.string('tagTitle');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('discussions')
};
