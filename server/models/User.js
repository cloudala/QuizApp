const mongoose = require('../db/connection');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  correctAnswers: { type: Number, default: 0 },
  favourite: { type: String },
  history: [
    {
      id: { type: String, required: true },
      result: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

// Hashing the password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;