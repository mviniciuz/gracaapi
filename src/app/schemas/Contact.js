import mongoose from 'mongoose';

const Contact = new mongoose.Schema({
  name: {
    type: String,
  },
  mail: {
    type: String,
  },
  phone: {
    type: String,
  },
  tags: [String]
});

export default mongoose.model('Contact', Contact);
