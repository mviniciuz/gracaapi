import mongoose from 'mongoose';

const Position = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Position', Position);
