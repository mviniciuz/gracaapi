import News from '../schemas/News';
import * as Yup from 'yup';

class NewsController {

  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string()
        .required('Informe o tipo'),
      title: Yup.string()
        .required('Informe o título'),
      edition: Yup.string()
        .required('Informe a Edição'),
      Data: Yup.string()
        .required('Informe a data de publicação'),
      author: Yup.string()
        .required('Informe o autor'),
      body: Yup.string()
        .required('Informe texto a ser exibido na publicação'),
      activeSite: Yup.boolean()
        .required('Informe o status'),
    });
    schema.validate(req.body).catch((err) => {
      return res.json(err.errors[0]);
    });

    const response = await News.create(req.body);

    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string()
        .required('Informe o tipo'),
      title: Yup.string()
        .required('Informe o título'),
      edition: Yup.string()
        .required('Informe a Edição'),
      Data: Yup.string()
        .required('Informe a data de publicação'),
      author: Yup.string()
        .required('Informe o autor'),
      body: Yup.string()
        .required('Informe texto a ser exibido na publicação'),
      activeSite: Yup.boolean()
        .required('Informe o status'),
    });
    schema.validate(req.body).catch((err) => {
      return res.json(err.errors[0]);
    });

    const { id } = req.params;
    const news = await News.findById(id);
    if (!news) {
      return res.json({ erro: 'Registro de notícias não encontrado' });
    }

    await News.findByIdAndUpdate(id, req.body);

    const updated = await News.findById(id);

    return res.json(updated);
  }

  async delete(req, res) {

    const { id } = req.params;

    const news = await News.findById(id);
    if (!news) {
      return res.json({ erro: 'Registro não encontrado' })
    }

    await News.findByIdAndDelete(id);


    return res.json({ ok: 'delete' });
  }

  async show(req, res) {
    const { id } = req.params;

    const news = await News.findById(id);
    if (!news) {
      return res.json({ erro: 'Registro não encontrado' })
    }

    return res.json(news);
  }

  async index(req, res) {
    const response = await News.find({});
    return res.json(response);
  }

}

export default new NewsController();
