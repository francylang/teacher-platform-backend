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

app.post('/api/v1/discussions', (request, response) => {
  const discussion = request.body;

  for (let requiredParameter of ['title', 'body', 'tagId']) {
    if (!discussion[requiredParameter]) {
      return response.status(422).json({
        error: `You are missing the ${requiredParameter} property.`
      });
    }
  }

  database('discussions').insert(discussion, 'id')
    .then(discussionId => response.status(201).json({ id: discussionId[0] }))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/discussions/:id', (request, response) => {
  const { id } = request.params;

  database('discussions').where('id', id).select()
  .then((discussion) => {
    return response.status(200).json(discussion);
  })
  .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/discussions/:id/comments', (request, response) => {
  const { id } = request.params;

  database('comments').where('discussionId', id).select()
  .then((comments) => {
    return response.status(200).json(comments);
  })
  .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/comments/:id', (request, response) => {
  const { id } = request.params;

  database('comments').where({ id }).del()
    .then(comment => {
      if (comment) {
        return response.sendStatus(204);
      } else {
        return response.status(422).json({ error: 'Not Found' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
