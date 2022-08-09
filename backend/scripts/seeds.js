//TODO: seeds script should come here, so we'll be able to put some data in our local env

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const User = require("../models/User");
const Item = require("../models/Item");
const Comment = require("../models/Comment");

const seed = async (i) => {
  let u = new User({
    email: `${i}@email.com`,
    username: i,
  });
  u.setPassword(`${i}`);
  const user = await u.save();
  var i = new Item({ title: i, description: "", tagList: [] });
  i.seller = user;
  const item = await i.save();
  var c = new Comment({ body: "nice" });
  c.item = item;
  c.seller = user;
  const comment = await c.save();
  i.comments = item.comments.concat([comment]);
  await i.save();
};

for (let i = 0; i < 100; i++) {
  seed(i);
}
