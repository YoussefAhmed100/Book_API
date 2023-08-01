const userModel = require("../models/User.cjs");
const becrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async function (req, res) {
  try {
    let newUsers = new userModel(req.body);
    const hashPasword = await becrypt.hash(req.body.password, 10);
    newUsers.password = hashPasword;
    let user = await newUsers.save();
    return res.jeson({
      message: "User registred succesflly",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};
exports.login = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user || !user.comparePassword(req.body.password)) {
      //TODO
      return res.status(401).jeson({ message: "invalid username or password" });
    }
    const token = jwt.sign(
      { name: user.name, email: user.email, id: user._id, role: user.role },
      "secuirtkey"
    );
    return res.jeson({
      message: "User login succesflly",
      user: { name: user.name, email: user.email, token: token },
    });
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};
