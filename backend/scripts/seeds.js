//TODO: seeds script should come here, so we'll be able to put some data in our local env

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const User = require("../models/User");
const Item = require("../models/Item");
const Comment = require("../models/Comment");

let users = [];
let items = [];
let comments = [];

const seedUsers = async () => {
  for (let i = 0; i < 100; i++) {
    let u = new User({
      email: `${i}@email.com`,
      username: i,
    });
    u.setPassword(`${i}`);
    users.push(u);
  }
  await User.insertMany(users);
};

const seedItems = async () => {
  for(let i = 0; i < 100; i++) {
    var x = new Item({ title: i, description: "", tagList: [] });
    x.seller = users[i];
    items.push(x);
  }
  await Item.insertMany(items);
};

const seedComments = async () => {
  for(let i = 0; i < 100; i++) {
    var c = new Comment({ body: "nice" });
    c.item = items[0];
    c.seller = users[i];
    comments.push(c);
  }
  await Comment.insertMany(comments);
  await Item.findByIdAndUpdate(items[0]._id, { comments });
};

seedUsers();
seedItems();
seedComments();
