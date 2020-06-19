import Team from '../schemas/Team';

import * as Yup from 'yup';

class TeamController {

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required('Informar o Nome!'),
      position: Yup.string()
        .required('Informa o cargo'),
    });
    schema.validate(req.body).catch((err) => {
      return res.json({ erro: err.errors[0] });
    });

    const { name, position } = req.body;

    const team = await Team.create(req.body);
    return res.json(team);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required('Informar o Nome!'),
      position: Yup.string()
        .required('Informa o cargo'),
    });
    schema.validate(req.body).catch((err) => {
      return res.json({ erro: err.errors[0] });
    });

    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.json({ erro: 'registro não encontrado' });
    }

    await team.update(req.body);

    const teamUpdated = await Team.findById(req.params.id);

    return res.json(teamUpdated);

  }

  async delete(req, res) {

    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.json({ erro: 'registro não encontrado' });
    }

    await team.delete();

    return res.json({ ok: 'delete' });
  }

  async show(req, res) {
    const team = await Team.findById(req.params.id);
    return res.json(team);
  }

  async index(req, res) {
    const teams = await Team.find({});
    return res.json(teams);
  }
}

export default new TeamController();
