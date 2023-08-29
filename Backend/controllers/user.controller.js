const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");

const createoken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

module.exports.getUser = async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json(users);
};

module.exports.getCurrentUser = async (req, res) => {
  res.status(200).send(req.user);
};

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    const token = createoken(user._id);

    res.status(201).json({ name, email, token });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userName = await User.findOne({ email });
    const name = userName.name;
    const user = await User.login(name, email, password);
    const token = createoken(user._id);

    res.status(201).json({ name, email, token });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
