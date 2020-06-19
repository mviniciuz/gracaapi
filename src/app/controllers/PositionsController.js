import Position from '../schemas/Position';
import * as Yup from 'yup';

class PositionController {

  async store(req, res) {
    const schema = Yup.object().shape({
      position: Yup.string()
        .required('Informar o Nome do cargo')
    })
    schema.validate(req.body).catch((err) => {
      return res.json({ erro: err.erros[0] })
    });

    const position = await Position.create(req.body);

    return res.json(position);
  }

  async delete(req, res) {

    const { id } = req.params;

    const position = await Position.findById(id);
    if (!position) {
      return res.json({ erro: 'Registro não encontrado' });
    }

    await position.delete();

    return res.json({ ok: true });
  }

  async index(req, res) {

    const positions = await Position.find();

    return res.json(positions);
  }
}

export default new PositionController();
