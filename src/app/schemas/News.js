import mongoose from 'mongoose';

const News = new mongoose.Schema({
  type: String,
  title: String,
  edition: String,
  Data: String,
  author: String,
  body: String,
  activeSite: Boolean,
}, {
  timestamps: true,
});

export default mongoose.model('News', News);
