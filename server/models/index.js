import mongoose from 'mongoose';

export const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
  teams: Array
});

export const Member = mongoose.model('Member', {
  teamid: Number,
  userid: Number
});

export const Team = mongoose.model('Team', {
  id: Number,
  name: String,
  members: Array,
  channels: Array,
  owner: Number
});

export const Channel = mongoose.model('Channel', {
  id: Number,
  name: String,
  teamid: Number,
  messages: Array,
  public: Boolean
});

export const Messages = mongoose.model('Messages', {
  text: String,
  userid: Number,
  channelId: Number
});
