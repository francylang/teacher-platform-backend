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
- Successful status code of 201.
- The id of the newly created discussion will be returned.

`{
    "id": 45
}`

#### Errors:
- This endpoint will throw a 422 if not found:

```javascript
{ error: 'You are missing the (requiredParameter) property.' }
```

- This endpoint will throw a 500:

```javascript
{ error: error message here }
```


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

```javascript
{
    "id": 46
}
```

#### Errors:
- This endpoint will throw a 422 if not found:

```javascript
{ error: 'You are missing the (requiredParameter) property.' }
```

- This endpoint will throw a 500:

```javascript
{ error: error message here }
```
