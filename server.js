const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const jwt = require('jsonwebtoken');

require('dotenv').config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Teacher Forum';
app.use(express.static(__dirname + '/public'));

app.set('secretKey', process.env.SECRET_KEY);

const checkAuth = (request, response, next) => {
  let token = request.body.token || request.query.token || request.headers['x-access-token'];
  const secretKey = app.get('secretKey');

  if (!token) {
    return response.status(403).send('You must be authorized to hit this endpoint.');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return response.status(403).json('Invalid token.');
    }

    if (decoded.body === 'body') {
      next();
    } else {
      return response.status(403).json({ error: 'Invalid application. ' });
    }
  });
};

app.get('/', (request, response) => {
  response.send('Oh, hai!');
});

app.post('/api/v1/authenticate', (request, response) => {
  const secretKey = app.get('secretKey');
  const { email, appName } = request.body;

  if (!email || !appName) {
    return response.status(422).json({
      error: `You are missing an email, application name, or both.`,
    });
  }

  const admin = email.endsWith('@turing.io');
  const token = jwt.sign({ admin }, secretKey);
  return response.status(201).json({ token });
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

  for (const requiredParameter of ['title', 'body', 'tagId']) {
    if (!discussion[requiredParameter]) {
      return response.status(422).json({
        error: `You are missing the ${requiredParameter} property.`,
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

app.patch('/api/v1/discussions/:id', checkAuth, (request, response) => {
  const { id } = request.params;
  const bodyUpdate = request.body;

  if (!bodyUpdate.body) {
    return response.status(422).json({
      error: `You must send only an object literal.`,
    });
  }

  database('discussions').where('id', id)
    .update(bodyUpdate, "*")
    .then((update) => {
      if (!update.length) {
        return response.sendStatus(404);
      }
      return response.sendStatus(204);
    })
    .catch((error) => {
      return response.status(500).json({ error });
    });
});

app.delete('/api/v1/discussions/:id', (request, response) => {
  const { id } = request.params;

  database('discussions').where({ id }).del()
    .then((discussion) => {
      if (discussion) {
        return response.sendStatus(204);
      }
      return response.status(422).json({ error: 'Not Found' });
    })
    .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/comments/:id', (request, response) => {
  const { id } = request.params;
  const commentUpdate = request.body;

  if (!commentUpdate.body) {
    return response.status(422).json({
      error: `You must send only an object literal with the key 'body' and a string value.`,
    });
  }

  database('comments').where('id', id)
    .update(commentUpdate, "*")
    .then((update) => {
      if (!update.length) {
        return response.sendStatus(404);
      }
      return response.sendStatus(204);
    })
    .catch((error) => {
      return response.status(500).json({ error });
    });
});

app.delete('/api/v1/comments/:id', (request, response) => {
  const { id } = request.params;

  database('comments').where({ id }).del()
    .then((comment) => {
      if (comment) {
        return response.sendStatus(204);
      }
      return response.status(422).json({ error: 'Not Found' });
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

app.post('/api/v1/discussions/:id/comments', (request, response) => {
  let comment = request.body;
  const { id } = request.params;

  if (!comment.body) {
    return response.status(422).json({
      error: `You are missing the body property.`,
    });
  }

  comment = Object.assign({}, comment, { discussionId: id });

  database('comments').insert(comment, '*')
    .then(insertedComment => response.status(201).json(insertedComment))
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/topicTags/:id/discussions', (request, response) => {
  let discussion = request.body;
  const { id } = request.params;

  for (let requiredParameter of ['title', 'body']) {
    if (!discussion[requiredParameter]) {
      return response.status(422).json({
        error: `You are missing the ${requiredParameter} property.`,
      });
    }
  }

  discussion = Object.assign({}, discussion, { tagId: id });

  database('discussions').insert(discussion, '*')
    .then(insertedDiscussion => response.status(201).json(insertedDiscussion))
    .catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
