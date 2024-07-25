const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../MongoDB/Models/user");

module.exports = {
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User does not exist.");
      }

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect.");
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return { userId: user.id, token, tokenExpiration: 1 };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createUser: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("User already exists.");
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({ email, password: hashedPassword });
      const result = await newUser.save();
      return { ...result._doc, password: null };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
