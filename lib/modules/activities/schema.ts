import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  rate: { type: Number, required: true }
});

export default mongoose.model('activities', schema);