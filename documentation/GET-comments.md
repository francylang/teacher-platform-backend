#### GET all Comments that belong to a specific Discussion
`/api/v1/discussions/:id/comments`

##### Description:
- Returns all comments that belong to a specific discussion

#### Return:
-  A successful 200 response will be served.
```javascript
[
    {
        "id": 5,
        "body": "They should know x is horizontal and y is vertical; be prepared for misconceptions about counting into negative integers.",
        "discussionId": 4,
        "created_at": "2017-12-14T00:27:08.832Z",
        "updated_at": "2017-12-14T00:27:08.832Z"
    }
]
```
#### Errors:
- This endpoint will throw a 500:

```javascript
{ error: error message here }
```
