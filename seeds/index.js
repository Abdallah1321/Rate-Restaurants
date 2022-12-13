const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Restaurant = require("../models/restaurant");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Restaurant.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const res = new Restaurant({
      author: "6392e28cbe686e32142c960d",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/1028299",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero culpa commodi, officiis enim voluptatibus, quas ex porro perferendis in temporibus, iure numquam reiciendis odit. Ducimus pariatur delectus hic sapiente corporis?",
      price,
    });
    await res.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
