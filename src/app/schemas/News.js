import mongoose from 'mongoose';

const News = new mongoose.Schema(
  {
    type: String,
    title: String,
    edition: String,
    data: String,
    author: String,
    textLabel: String,
    body: String,
    activeSite: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('News', News);
