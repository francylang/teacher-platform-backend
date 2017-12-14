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
- Successful status code of 201.
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
#### Errors:
- This endpoint will throw a 422 if not found:

```javascript
{ error: 'You are missing the body property.' }
```

- This endpoint will throw a 500:

```javascript
{ error: error message here }
```
