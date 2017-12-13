/* eslint-disable */

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('topicTags', function(table) {
      table.increments('id').primary();
      table.string('tagTitle');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('discussions', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('body');
      table.integer('tagId').unsigned();
      table.foreign('tagId')
      .references('topicTags.id').onDelete('cascade');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('comments', function(table) {
      table.increments('id').primary();
      table.string('body');
      table.integer('discussionId').unsigned();
      table.foreign('discussionId')
        .references('discussions.id').onDelete('cascade');

      table.timestamps(true, true);
    }),

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('discussions'),
    knex.schema.dropTable('topicTags')
  ]);
};
