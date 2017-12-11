// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/teacher_forum',
    migrations: {
      director: './db/migrations'
    },
    useNullAsDefault: true
  }
};
