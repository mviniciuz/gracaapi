import mongoose from 'mongoose';

const User = new mongoose.Schema({
  document: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
  },
  password_hash: {
    type: String,
    required: true
  },

},
  {
    timestamps: true
  }
)

export default mongoose.model('User', User);
