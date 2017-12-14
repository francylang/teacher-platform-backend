#### PATCH a Comment
/api/v1/comments/:id

#### Authentication:
- JWT is required to be passed into one of the following:
  - query parameter ('api/v1/discussions/?token=UNIQUE_JWT')
  - request header
  - request body

##### Description:
- Change the body of a comment that already exists in the database.

#### Return:
-  A successful 204 response will be served and changes will be reflected in database. The user will not receive a return object.
