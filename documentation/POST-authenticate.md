#### POST Authenticate
`/api/v1/authenticate`

##### Description:
- Provides the client with a JSON Web Token (JWT) according to authorization level.
- User will be provided a JWT upon submitting and email and app name.
- Only users with a valid email ending in `@turing.io` will be granted 'admin' privileges (POST, PUT, PATCH, DELETE)

##### Return:
- Successful status code of 201.
- The token object

`{
  "token": ""
  }
`

#### Errors:
- This endpoint will throw a 422 if not found:

```javascript
{ error: 'You are missing the (requiredParameter) property.' }
```

- This endpoint will throw a 500:

```javascript
{ error: error message here }
```
