import mongoose from 'mongoose';

const Contact = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    mail: {
      type: String,
    },
    phone: {
      type: String,
    },
    tags: [String],
    status: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Contact', Contact);
