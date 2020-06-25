import Tag from '../schemas/Tag';
import * as Yup from 'yup';

class TagController {

  async store(req, res) {
    const schema = Yup.object().shape({
      tag: Yup.string()
        .required('Informar a Tag'),
    });
    schema.validate(req.body).catch((err) => {
      return res.json({ erro: err.errors[0] });
    });

    const { tag } = req.body.tag;

    const existe = await Tag.findOne({ tag });
    if (existe) {
      return res.json({ erro: 'tag já cadastrada' });
    }

    const response = await Tag.create(req.body);

    return res.json(response);
  }

  async delete(req, res) {

    const id = req.params.id;

    const existe = await Tag.findById(id);
    if (!existe) {
      return res.json({ erro: 'tag não encontrada' });
    }

    const deleted = await Tag.findByIdAndDelete(id);

    return res.json({ ok: 'delete' });
  }

  async index(req, res) {
    const response = await Tag.find({});
    return res.json(response);
  }
}

export default new TagController();

