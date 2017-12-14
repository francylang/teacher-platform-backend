# Classroom Crash backend

Classroom Crash Backend API provides access to a database of teacher questions and comments aligned to Math 6 Common Core State Standards.
Version 1 of the API is limited to Grade 6 and standard codes, but Grades 7-8 and standard details will be coming in version 2.

The API is REST API. Return format for all endpoints is JSON.

***

## Endpoints
### GET
#### POST Authenticate
`/api/v1/authenticate`

##### Description:
- Provides the client with a JSON Web Token (JWT) according to authorization level.
- User will be provided a JWT upon submitting and email and app name.
- Only users with a valid email ending in `@turing.io` will be granted 'admin' privileges (POST, PUT, PATCH, DELETE)

##### Return:
`{
  "token": ""
  }`


#### GET all Topic Tags
`/api/v1/topicTags`

##### Description:
- Returns all topic tags

#### Return:
`[
    {
        "id": 2,
        "tagTitle": "6.RP.A.2",
        "created_at": "2017-12-14T00:27:08.737Z",
        "updated_at": "2017-12-14T00:27:08.737Z"
    },
    {
        "id": 3,
        "tagTitle": "6.RP.A.3",
        "created_at": "2017-12-14T00:27:08.748Z",
        "updated_at": "2017-12-14T00:27:08.748Z"
    },
    {
        "id": 11,
        "tagTitle": "6.NS.B.4",
        "created_at": "2017-12-14T00:27:08.762Z",
        "updated_at": "2017-12-14T00:27:08.762Z"
    },
  ]`


#### GET a specific Topic Tag
`/api/v1/topicTags/:id`

##### Description:
- Returns a specific topic tag by ID

#### Return:
`[
    {
        "id": 3,
        "tagTitle": "6.RP.A.3",
        "created_at": "2017-12-14T00:27:08.748Z",
        "updated_at": "2017-12-14T00:27:08.748Z"
    }
]`


#### GET all Discussions
`/api/v1/discussions`

##### Description:
- Returns all discussions

#### Return:
`[
    {
        "id": 2,
        "title": "Tape Diagrams",
        "body": "I'm having a hard time grasping tape diagrams well enough to teach kids how to use them as a tool. Any resources?",
        "tagId": 2,
        "created_at": "2017-12-14T00:27:08.792Z",
        "updated_at": "2017-12-14T00:27:08.792Z"
    },
    {
        "id": 3,
        "title": "Double number line",
        "body": "I get it, but I'm struggling to find the words to explain this without getting too procedural. Any tips?",
        "tagId": 2,
        "created_at": "2017-12-14T00:27:08.793Z",
        "updated_at": "2017-12-14T00:27:08.793Z"
    },
    {
        "id": 1,
        "title": "Unit Rate",
        "body": "Didn't kids get this in Grade 5? I'm confused about why it's in the standards.",
        "tagId": 1,
        "created_at": "2017-12-14T00:27:08.793Z",
        "updated_at": "2017-12-14T00:27:08.793Z"
    },
  ]`

#### GET a specific Discussion
`/api/v1/discussions/:id`

##### Description:
- Returns a specific discussion by ID

#### Return:
`[
    {
        "id": 4,
        "title": "Coordinate Plane",
        "body": "Should students already know how to plot points on a coordinate plane?.",
        "tagId": 3,
        "created_at": "2017-12-14T00:27:08.794Z",
        "updated_at": "2017-12-14T00:27:08.794Z"
    }
]`

#### GET all Comments that belong to a specific Discussion
`/api/v1/discussions/:id/comments`

##### Description:
- Returns all comments that belong to a specific discussion

#### Return:
`[
    {
        "id": 5,
        "body": "They should know x is horizontal and y is vertical; be prepared for misconceptions about counting into negative integers.",
        "discussionId": 4,
        "created_at": "2017-12-14T00:27:08.832Z",
        "updated_at": "2017-12-14T00:27:08.832Z"
    }
]`

### PATCH
#### PATCH a Discussion
`/api/v1/discussions/:id`

#### Authentication:
- JWT is required to be passed into one of the following:
  - query parameter ('api/v1/discussions/?token=UNIQUE_JWT')
  - request header
  - request body

##### Description:
- Change the title and/or body of a discussion that already exists in the database.

#### Return:
-  A successful 204 response will be served and changes will be reflected in database. The user will not receive a return object.


#### PATCH a Comment
/api/v1/comments/:id

#### Authentication:
- JWT is required to be passed into one of the following:
  - query parameter ('api/v1/discussions/?token=UNIQUE_JWT')
  - request header
  - request body

##### Description:
- Change the body of a comment that already exists in the database.

#### Return:
-  A successful 204 response will be served and changes will be reflected in database. The user will not receive a return object.


### POST

#### POST to Discussions
/api/v1/discussions

#### Authentication:
- JWT is required to be passed into one of the following:
  - query parameter ('api/v1/discussions/?token=UNIQUE_JWT')
  - request header
  - request body

##### Description:
- Post a new discussion to the database.

#### Return:
- The id of the newly created discussion will be returned.

`{
    "id": 45
}`


#### POST to Discussions
/api/v1/topicTags/:id/discussions

#### Authentication:
- JWT is required to be passed into one of the following:
  - query parameter ('api/v1/discussions/?token=UNIQUE_JWT')
  - request header
  - request body

##### Description:
- Post a new discussion to the database.

#### Return:
- The id of the newly created discussion will be returned.

`{
    "id": 46
}`

#### POST to Comments
/api/v1/discussions/:id/comments

#### Authentication:
- JWT is required to be passed into one of the following:
  - query parameter ('api/v1/discussions/?token=UNIQUE_JWT')
  - request header
  - request body

##### Description:
- Post a new discussion to the database.

#### Return:
- The entire object of the newly created discussion will be returned.
`[
    {
        "id": 57,
        "body": "I would recommend some visuals - see attached.",
        "discussionId": 1,
        "created_at": "2017-12-14T01:23:04.534Z",
        "updated_at": "2017-12-14T01:23:04.534Z"
    }
]`

### DELETE

#### DELETE a specific Discussion
/api/v1/discussions/:id

#### Authentication:
- JWT is required to be passed into one of the following:
  - query parameter ('api/v1/discussions/?token=UNIQUE_JWT')
  - request header
  - request body

##### Description:
- Delete the entire discussion matching the ID, and all comments that belong to that discussion.

#### Return:
-  A successful 204 response will be served and changes will be reflected in database. The user will not receive a return object.


#### DELETE a specific Comment
/api/v1/comments/:id

#### Authentication:
- JWT is required to be passed into one of the following:
  - query parameter ('api/v1/discussions/?token=UNIQUE_JWT')
  - request header
  - request body

##### Description:
- Delete the entire comment matching the ID.

#### Return:
-  A successful 204 response will be served and changes will be reflected in database. The user will not receive a return object.
