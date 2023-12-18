// module= is a file that store particular code eg function array obj variable etc
// exports = simply export the module( but in terms of object)
// BUT THERE IS AN EXCEPTION
// {
// BY DEFAULT MODULE.EXPORTS IS A EMPTY OBJECT

// if we do module.exports= 'hello world' there wont be any object in exports just 'sameer'
// same goes for module.exports= function,array etc
// BASICALLY IF NOT IN THE FORM OF KEY/VALUE PAIR EXPORTS WONT BE AN OBJECT BUT THE PARTICULAR STRING/FUNCTION/ARRAY/ROTUER ITSELF

// BUT IF WE DO LIKE
// module.exports.name="sameer" // then export object is generated as {name:"sameer"}
// or module.export= {name}//then also export object is generated as {name:"sameer"} (given that name is "sameer")
// }

const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const userExist = await user.findOne({ username });
    if (userExist) {
      return res.json({ errors: "Username already exists" });
    }
    const emailExits = await user.findOne({ email });
    if (emailExits) {
      return res.json({ errors: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const User = await user.create({
      username,
      email,
      password: hashPassword,
    });
    const jsonuser = User.toJSON(); // mongoose object cannot be operated as js/json object
    delete jsonuser.password; //deletes the password from the object User

    res.json(jsonuser);
  } catch (error) {
    res.json({ errors: "Internal Error Occured" });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const User = await user.findOne({ username });

    if (!User) {
      return res.json({ errors: "Please enter a valid credentials" });
    }
    const passwordCheck = await bcrypt.compare(password, User.password);
    if (!passwordCheck) {
      return res.json({ errors: "Please enter a valid credentials" });
    }
    const jsonUser = User.toJSON();
    delete jsonUser.password;
    res.json(jsonUser);
  } catch (error) {
    console.log(error);
    res.json({ errors: "Internal Error Occured" });
  }
};

const setAvatar = async (req, res) => {
  try {
    const { image, userId } = req.body;

    const userData = await user.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        AvatarImage: image,
      },
      { new: true }
    );
    const jsonUser = userData.toJSON();
    delete jsonUser.password;
    res.json(jsonUser);
  } catch (error) {
    console.log(error);
    res.json({ errors: "Internal Error Occured" });
  }
};

const allUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const allUsers = await user
      .find({ _id: { $ne: id } }) //returns all the data whose id is not equal to the userId
      .select("username email _id AvatarImage");

    res.json(allUsers);
  } catch (error) {
    res.json({ errors: "Internal Error Occured" });
  }
};
module.exports = { register, login, setAvatar, allUsers };
// console.log(module); // check this to remove confusion
