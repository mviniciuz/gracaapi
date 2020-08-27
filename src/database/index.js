import mongoose from 'mongoose';
import mongoConfig from '../config/mongo';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      `mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: false,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
  }
}

export default new Database();
