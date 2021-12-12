# auth0_user_update

Allows for updating users on Auth0 through the Auth0 API.

Reads a list of user email addresses from a flat file, then gets a token and updates each user meta data with a new key/value.

## Usage
1. clone repo
2. npm install
3. create users.txt file, one user email per line
4. change the user update task as required for your needs
5. run node index.js
