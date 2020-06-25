import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  name: String,
  path: String,
  url: {
    type: String,
    get() {
      return `${process.env.APP_URL}/files/${this.path}`;
    },
  },
},
  {
    timestamps: true,
  });

export default mongoose.model('File', FileSchema);
