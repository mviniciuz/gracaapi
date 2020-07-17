import * as Yup from 'yup';
import Tag from '../schemas/Tag';

class TagController {
  async store(req, res) {
    const schema = Yup.object().shape({
      tag: Yup.string().required('Informar a Tag'),
    });
    schema.validate(req.body).catch((err) => {
      return res.status(400).json({ erro: err.errors[0] });
    });

    const { tag } = req.body.tag;

    const existe = await Tag.findOne({ tag });
    if (existe) {
      return res.status(400).json({ erro: 'tag já cadastrada' });
    }

    const response = await Tag.create(req.body);

    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      tag: Yup.string().required('Informar a Tag'),
    });
    schema.validate(req.body).catch((err) => {
      return res.status(400).json({ erro: err.errors[0] });
    });

    const { id } = req.params;

    const existe = await Tag.findById(id);
    if (!existe) {
      return res.status(400).json({ erro: 'tag não encontrada' });
    }

    const response = await Tag.findByIdAndUpdate(id, req.body);

    return res.json(response);
  }

  async delete(req, res) {
    const { id } = req.params;

    const existe = await Tag.findById(id);
    if (!existe) {
      return res.status(400).json({ erro: 'tag não encontrada' });
    }

    await Tag.findByIdAndDelete(id);

    return res.json({ ok: 'delete' });
  }

  async index(req, res) {
    const { page = 1, arg = '' } = req.query;

    let where = {};
    if (arg !== '') {
      where = {
        tag: { $regex: arg, $options: 'i' },
      };
    }

    const response = await Tag.find(where)
      .limit(10)
      .skip((page - 1) * 10);
    return res.json(response);
  }
}

export default new TagController();
