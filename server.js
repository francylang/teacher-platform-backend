const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('express-cors');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const jwt = require('jsonwebtoken');
require('dotenv').config();

const httpsRedirect = (request, response, next) => {
  if (request.header('x-forwarded-proto') !== 'https') {
    return response.redirect(`https://${request.get('host')}${request.url}`);
  }
  next();
};

if (process.env.NODE_ENV === 'production') { app.use(httpsRedirect); }

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Teacher Forum';
app.use(express.static(__dirname + '/public'));

app.set('secretKey', process.env.SECRET_KEY);

const checkAuth = (request, response, next) => {
  let token = request.body.token || request.query.token || request.headers.authorization;
  const secretKey = app.get('secretKey');

  if (!token) {
    return response.status(403).send('You must be authorized to hit this endpoint.');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return response.status(403).json('Invalid token.');
    }

    if (decoded.admin) {
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
  const queryParameter = request.query.tagTitle;

  if (queryParameter) {
    database('topicTags').where('tagTitle', queryParameter).select()
      .then(topicTag => response.status(200).json(topicTag))
      .catch(() => response.sendStatus(404));
  } else {
    database('topicTags').select()
      .then((topicTags) => {
        return response.status(200).json(topicTags);
      })
      .catch(error => response.status(500).json({ error }));
  }
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

app.post('/api/v1/discussions', checkAuth, (request, response) => {
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

app.delete('/api/v1/discussions/:id', checkAuth, (request, response) => {
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

app.patch('/api/v1/comments/:id', checkAuth, (request, response) => {
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

app.delete('/api/v1/comments/:id', checkAuth, (request, response) => {
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

app.post('/api/v1/discussions/:id/comments', checkAuth, (request, response) => {
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

app.post('/api/v1/topicTags/:id/discussions', checkAuth, (request, response) => {
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
  // eslint-disable-next-line
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
