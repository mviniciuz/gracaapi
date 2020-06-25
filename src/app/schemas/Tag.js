import mongoose from 'mongoose';

const Tag = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  }
});

export default mongoose.model('Tag', Tag);
