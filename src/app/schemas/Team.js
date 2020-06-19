import mongoose from 'mongoose'

const Team = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true,
    }

  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Team', Team)
