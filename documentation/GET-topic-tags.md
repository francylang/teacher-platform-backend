#### GET all Topic Tags
`/api/v1/topicTags`

##### Description:
- Returns all topic tags
- User may also filter for a specific topic tog by specifying a search parameter when making a GET request. _Example: /api/v1/topicTags/?tagTitle=6.RP.A.2_

#### Return:
-  A successful 200 response will be served.
-  An example of the returned array can be found below

```javascript
[
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
  ]
```
#### Errors:
- This endpoint will throw a 500:

```javascript
{ error: error message here }
```
