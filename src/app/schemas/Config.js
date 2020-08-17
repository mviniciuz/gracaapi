import mongoose, { mongo } from 'mongoose';

const Config = new mongoose.Schema(
  {
    mail: {
      host: {
        type: String,
      },
      port: {
        type: String,
      },
      user: {
        type: String,
      },
      pass: {
        type: String,
      },
      secure: {
        type: Boolean,
      },
      from: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Config', Config);
