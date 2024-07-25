const User = require("../../MongoDB/Models/user");

module.exports = {
  login: async ({ email, password }) => {},
  createUser: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("User already exists.");
      }

      const newUser = new User({ email, password });
      const result = await newUser.save();
      return { ...result._doc, password: null };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
