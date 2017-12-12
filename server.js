const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Yo Teach';

app.get('/', (request, response) => {
  response.send('Oh, hai!');
});

app.get('/api/v1/topicTags', (request, response) => {
  database('topicTags').select()
  .then((topicTags) => {
    return response.status(200).json(topicTags);
  })
  .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/topicTags/:id', (request, response) => {
  const { id } = request.params;

  database('topicTags').where('id', id).select()
  .then((topicTag) => {
    return response.status(200).json(topicTag);
  })
  .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/discussions', (request, response) => {
  database('discussions').select()
  .then((discussions) => {
    return response.status(200).json(discussions);
  })
  .catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
