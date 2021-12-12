const _ = require("lodash");
const axios = require("axios").default;
const fs = require("fs");

require("dotenv").config();

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

const readUsers = () => {
  const users = fs.readFileSync("users.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  return users.split("\n");
};

async function main() {
  const ids = [];
  const users = readUsers();

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

main();
