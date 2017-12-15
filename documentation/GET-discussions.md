#### GET all Discussions
`/api/v1/discussions`

##### Description:
- Returns all discussions

#### Return:
-  A successful 200 response will be served.
- An example of the returned array can be found below

```javascript
[
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
  ]
```
#### Errors:
- This endpoint will throw a 500:

```javascript
{ error: error message here }
```
