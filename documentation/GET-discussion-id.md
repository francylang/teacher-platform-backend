#### GET a specific Discussion
`/api/v1/discussions/:id`

##### Description:
- Returns a specific discussion by ID

#### Return:
-  A successful 200 response will be served.
```javascript
[
    {
        "id": 4,
        "title": "Coordinate Plane",
        "body": "Should students already know how to plot points on a coordinate plane?.",
        "tagId": 3,
        "created_at": "2017-12-14T00:27:08.794Z",
        "updated_at": "2017-12-14T00:27:08.794Z"
    }
]
```

#### Errors:
- This endpoint will throw a 500:

```javascript
{ error: error message here }
```
