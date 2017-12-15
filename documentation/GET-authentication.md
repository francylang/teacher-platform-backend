#### GET a specific Discussion
`/api/v1/authenticate/`

##### Description:
- Issues user a JWT based on authorization level.
- User will need to submit email and an application name to receive their token.
- Only users with a valid email domain will be granted authorization to PUT, PATCH, or DELETE on the database.

#### Return:
-  A successful 201 response will be served.
-  A token will appear on the bottom of the screen
-  Example token found below
```javascript
eyJhbGciOiJIUzI1NiIsInR4cCI6IkpXVCJ9.eyIwIjoiUyIsIjSiOiJ0IiwiMiI8InUiLCIzIjoibSIsIjQiOiJwIiwiESI6IiAiLCI2IjoiTCIsIjciOiJ5IiwiOCI6ImYiLCI5IjoiZSIsCjEwIjoibiIsIjExIjoiZyIsIjEyIjoiLiIsIjEzIjoiaSIsIjE0IjoibyIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTMyNzc2NjF3.Pxx03HktJEaVL2mMVyqkMsEFmPe9sAvnNr37_MdJbLg
```

#### Errors:
- This endpoint will throw a 422 error:

```javascript
{ error: 'You are missing an email, application name, or both.'}
```
