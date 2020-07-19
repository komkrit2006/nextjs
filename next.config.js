require('dotenv').config();

module.exports = {
  // set environment at build time
  env: {
    MY_ENV: process.env.MY_ENV,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    MY_SECRET: process.env.MY_SECRET,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    MY_ENDPOINT: process.env.MY_ENDPOINT,
  },
};
