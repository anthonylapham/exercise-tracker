const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true }
}, { timestamps: true });

const ModelClass = mongoose.model('user', UserSchema);
module.exports = ModelClass;
