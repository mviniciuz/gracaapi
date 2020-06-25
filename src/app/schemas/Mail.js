import mongoose from 'mongoose';

const Mail = new mongoose.Schema({
  from: {
    type: String
  },
  to: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  redisId: {
    type: Number,
  },
  status: {
    type: String,
  },
  descriptionStatus: {
    type: String,
  }
},
  {
    timestamps: true,
  });

export default mongoose.model('Mail', Mail);
