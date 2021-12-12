const _ = require("lodash");
const axios = require("axios").default;
require("dotenv").config();

const users = ["justin.kay@inxpress.com", "justin.olsen@inxpress.com"];

const getBearerToken = async () => {
  const response = await axios.post(`${process.env.URL}/oauth/token`, {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    audience: `${process.env.URL}/api/v2/`,
    grant_type: "client_credentials",
  });
  return response.data.access_token;
};

const getUserId = async (config, email) => {
  response = await axios.get(
    `${process.env.URL}/api/v2/users-by-email?email=${email}`,
    config
  );
  if (!_.isEmpty(response.data)) return response.data[0].user_id;
};

const updateUser = async (config, id) => {
  response = await axios.patch(
    `${process.env.URL}/api/v2/users/${id}`,
    {
      user_metadata: { test: "it worked" },
    },
    config
  );
  console.log(response.data);
};

async function useToken() {
  const ids = [];

  getBearerToken().then((token) => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    users.forEach(async (user) => {
      id = getUserId(config, user);
      ids.push(id);
    });
    Promise.all(ids).then((userIds) => {
      const ids = _.compact(userIds);
      ids.forEach(async (id) => {
        updateUser(config, id);
      });
      console.log(ids);
    });
  });
}

useToken();
