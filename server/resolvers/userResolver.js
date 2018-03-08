import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Query: {
    getUser: async (root, { id }, { User }) => {
      const user = await User.findById(id);
      user._id = user._id.toString();

      return user;
    },

    allUsers: async (root, args, { User }) => {
      const users = await User.find(args);
      return users.map(user => {
        user._id = user._id.toString();

        return user;
      });
    }
  },

  Mutation: {
    registerUser: async (root, { password, ...args }, { User, JWT_SECRET }) => {
      try {
        const hash = await bcrypt.hash(password, 10);
        const user = await new User({ ...args, password: hash }).save();

        user.jwt = jwt.sign({ _id: user._id }, JWT_SECRET);

        return user;
      } catch (e) {
        return false;
      }
    },

    loginUser: async (root, { email, password }, { User, JWT_SECRET }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Email not found');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error('Invalid password');
      }

      user.jwt = jwt.sign({ _id: user._id }, JWT_SECRET);

      return user;
    }
  }
};
