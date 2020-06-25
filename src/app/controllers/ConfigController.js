import Config from '../schemas/Config';

class ConfigController {
  async store(req, res) {

    const config = await Config.findOne();

    const { _id } = config;

    await Config.findByIdAndUpdate(_id, req.body);

    const update = await Config.find();

    return res.json(update);
  }

  async index(req, res) {
    const update = await Config.find();

    return res.json(update);

  }
}

export default new ConfigController();
