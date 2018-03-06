import bcrypt from 'bcrypt';

export default {
  Query: {
    getUser: async (parent, { id }, { User }) => {
      const user = await User.findById(id);
      user._id = user._id.toString();

      return user;
    },

    allUsers: async (parent, args, { User }) => {
      const users = await User.find(args);
      return users.map(user => {
        user._id = user._id.toString();

        return user;
      });
    }
  },

  Mutation: {
    registerUser: async (parent, { password, ...args }, { User }) => {
      try {
        const hash = await bcrypt.hash(password, 10);
        const user = await new User({ ...args, password: hash }).save();

        return user;
      } catch (e) {
        return false;
      }
    }
  }
};
