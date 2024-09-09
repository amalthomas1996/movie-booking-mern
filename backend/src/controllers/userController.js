const User = require('../../models/User');

exports.createOrUpdateUser = async (profile) => {
  const { id, name, email } = profile;

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({
      name,
      email,
      googleId: id,
    });
    await user.save();
  }

  return user;
};
