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
```javascript
[
    {
        "id": 57,
        "body": "I would recommend some visuals - see attached.",
        "discussionId": 1,
        "created_at": "2017-12-14T01:23:04.534Z",
        "updated_at": "2017-12-14T01:23:04.534Z"
    }
]
```
