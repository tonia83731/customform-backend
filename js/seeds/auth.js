if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoose_url = process.env.MONGODB_URL;
const User = require("../models/auth-models");

mongoose
  .connect(mongoose_url)
  .then(async () => {
    const users = [
      {
        name: "Admin",
        email: "admin.customform@example.com",
        password: "1234",
      },
      {
        name: "Root",
        email: "root.customform@example.com",
        password: "1234",
      },
    ];

    const hashedUsers = users.map((user) => {
      const salt = bcrypt.genSaltSync(10);
      return {
        ...user,
        password: bcrypt.hashSync(user.password, salt),
      };
    });

    await User.insertMany(hashedUsers);
    console.log("user seeds added");

    await mongoose.disconnect();
    console.log("mongodb connection closed");
  })
  .catch((err) => console.error("mongodb error!", err.message));
