const authResolver = require("./auth");
const blogResolver = require("./Blog");

module.exports = {
  ...authResolver,
  ...blogResolver,
};
