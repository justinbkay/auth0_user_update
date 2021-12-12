const axios = require("axios").default;
require('dotenv').config()

const getBearerToken = async () => {
  const response = await axios.post(`${process.env.URL}/oauth/token`, {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    audience: `${process.env.URL}/api/v2/`,
    grant_type: "client_credentials",
  });
  return response.data.access_token;
};

function useToken() {
  getBearerToken().then((token) => {
    let config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.URL}/api/v2/users-by-email?email=justin.kay@inxpress.com`,
        config
      )
      .then(function (response) {
        console.log(response.data);
      });
  });
}

useToken();

