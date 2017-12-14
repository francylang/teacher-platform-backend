#### GET a specific Topic Tag
`/api/v1/topicTags/:id`

##### Description:
- Returns a specific topic tag by ID

#### Return:
-  A successful 200 response will be served.

```javascript
[
    {
        "id": 3,
        "tagTitle": "6.RP.A.3",
        "created_at": "2017-12-14T00:27:08.748Z",
        "updated_at": "2017-12-14T00:27:08.748Z"
    }
]
```

#### Errors:
- This endpoint will throw a 500:

```javascript
{ error: error message here }
```
