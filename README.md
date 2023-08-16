# Heatmap

### Environment Variables

| Name                  | Type   | Description                                                                              |
|-----------------------|--------|------------------------------------------------------------------------------------------|
| AUTH0_SECRET          | string | A long secret value used to encrypt the session cookie                                   |
| AUTH0_BASE_URL        | string | The URL Auth0 will redirect the user to after login/logout                               |
| AUTH0_ISSUER_BASE_URL | string | The URL of your Auth0 tenant domain                                                      |
| AUTH0_CLIENT_ID       | string | The ID of the designated Auth0 application used to make API requests                     |
| AUTH0_CLIENT_SECRET   | string | The Auth0 Client Secret                                                                  |
| S3REGION              | string | The region the S3 bucket is in. for example - `eu-north-1`                               |
| S3BUCKET              | string | The name of the S3 bucket                                                                |
| S3ACCESSKEYID         | string | The access key id of an AWS account with read and write privileges for the S3 bucket     |
| S3SECRETACCESSKEY     | string | The secret access key of an AWS account with read and write privileges for the S3 bucket |
