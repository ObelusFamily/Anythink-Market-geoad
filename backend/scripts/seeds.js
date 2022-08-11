//TODO: seeds script should come here, so we'll be able to put some data in our local env

const mongoose = require("mongoose");

const User = require("../models/User");
const Item = require("../models/Item");
const Comment = require("../models/Comment");

mongoose.connect(process.env.MONGODB_URI);

let users = [];
let items = [];
let comments = [];

const seedUsers = async () => {
  for (let i = 0; i < 2; i++) {
    const u = new User({ email: `${i}@email.com`, username: `${i}` });
    u.setPassword(`${i}`);
    users.push(u);
  }
  await User.insertMany(users);
};

const seedItems = async () => {
  users = await User.find();
  for (let i = 0; i < 2; i++) {
    const x = new Item({
      title: `${i}`,
      description: "",
      tagList: [],
      image: "",
    });
    x.seller = users[i];
    items.push(x);
  }
  await Item.insertMany(items);
};

const seedComments = async () => {
  items = await Item.find();
  for (let i = 0; i < 2; i++) {
    const c = new Comment({ body: "nice" });
    c.item = items[0];
    c.seller = users[i];
    comments.push(c);
  }
  await Comment.insertMany(comments);
  comments = await Comment.find();
  console.log(comments, items, users);
  await Item.findByIdAndUpdate(items[0]._id, {
    comments: [...items[0].comments, ...comments],
  });
};

const a = async () => {
  await seedUsers();
  await seedItems();
  await seedComments();
};

a();
