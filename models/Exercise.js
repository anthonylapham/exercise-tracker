const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  userId: { type: Schema.ObjectId, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true }
}, { timestamps: true });

const ModelClass = mongoose.model('exercise', ExerciseSchema);
module.exports = ModelClass;
