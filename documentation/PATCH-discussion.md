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

#### Errors:
- This endpoint will throw a 422 if not found:

```javascript
{ error: `You must send only an object literal.` }
```

- This endpoint will throw a 500:

```javascript
{ error: error message here }
```
