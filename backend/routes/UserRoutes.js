const express = require("express");
const router = express.Router();

const User = require("../models/User.js");

router.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
  });

  await user.save();

  res.status(201).json({ createdUser: user });
});

// get user by id
router.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ user });
});

router.get("/users", async (req, res) => {
  const users = await User.find({ ...req.body });
  res.status(200).json({ users });
});

router.put("/user/:id", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, password },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(200).json(user);
});

router.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  let statusCode = 200;
  let messageObject = { message: "successfully deleted user!" };

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      statusCode = 400;
      messageObject = { message: "could not find user to delete!" };
    }
  } catch (e) {
    if (e.kind === "ObjectId") {
      statusCode = 400;
      messageObject = {
        message:
          "there was a problem with the ObjectId format. Please ensure that you've entered a valid ObjectId",
        reason: e.reason.message,
      };
    } else {
      statusCode = 500;
    }
  }
  return res.status(statusCode).json({ messageObject });
});

router.get("/test", (req, res) => {
  res.status(200).json({ message: "good job" });
});

module.exports = router;
