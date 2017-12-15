# Teacher Forum API

Teacher Forum Backend API provides access to a database of teacher questions and comments aligned to Math 6 Common Core State Standards.
Version 1 of the API is limited to Grade 6 and standard codes, but Grades 7-8 and standard details will be coming in Version 2.

The API is a RESTful API. Return format for all endpoints is JSON.

***

## Endpoints

#### Authenticate

- [GET Authentication](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/GET-authentication.md)


### Data can be retrieved by utilizing the endpoints below.

#### GET
- [GET all Topic Tags](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/GET-topic-tags.md)
- [GET a specific Topic Tag](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/GET-topic-tag.md)
- [GET all Discussions](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/GET-discussions.md)
- [GET a specific Discussion](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/GET-discussion.md)
- [GET all Comments that belong to a specific Discussion](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/GET-comments.md)


### Data can be written to the server by utilizing the endpoints below. In order to write on the server a user requires the necessary authorization and must be authenticated.
_Example use of JWT authentication: api/v1/discussions/?token=UNIQUE_JWT_

#### PATCH
- [PATCH a Discussion](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/PATCH-discussion.md)
- [PATCH a Comment](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/PATCH-comment.md)

#### POST
- [POST Authenticate](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/POST-authenticate.md)
- [POST to Discussions](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/POST-discussion.md)
- [POST to Discussions by Topic Tag](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/POST-discussion-by-topicTag.md)
- [POST to Comments](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/POST-comment.md)

#### DELETE

- [DELETE a specific Discussion](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/DELETE-discussion.md)
- [DELETE a specific Comment](https://github.com/lfinney/build-your-own-backend/blob/master/documentation/DELETE-comment.md)
