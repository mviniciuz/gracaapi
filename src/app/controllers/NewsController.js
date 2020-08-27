import * as Yup from 'yup';
import News from '../schemas/News';
import Mail from '../schemas/Mail';

class NewsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().required('Informe o tipo'),
      title: Yup.string().required('Informe o título'),
      edition: Yup.string().required('Informe a Edição'),
      data: Yup.string().required('Informe a data de publicação'),
      author: Yup.string().required('Informe o autor'),
      body: Yup.string().required('Informe texto a ser exibido na publicação'),
      activeSite: Yup.boolean().required('Informe o status'),
    });
    schema.validate(req.body).catch((err) => {
      return res.status(400).json(err.erro[0]);
    });

    const response = await News.create(req.body);

    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().required('Informe o tipo'),
      title: Yup.string().required('Informe o título'),
      edition: Yup.string().required('Informe a Edição'),
      data: Yup.string().required('Informe a data de publicação'),
      author: Yup.string().required('Informe o autor'),
      body: Yup.string().required('Informe texto a ser exibido na publicação'),
      activeSite: Yup.boolean().required('Informe o status'),
    });
    schema.validate(req.body).catch((err) => {
      return res.status(400).json(err.erro[0]);
    });

    const { id } = req.params;
    const news = await News.findById(id);
    if (!news) {
      return res
        .status(400)
        .json({ erro: 'Registro de notícias não encontrado' });
    }

    await News.findByIdAndUpdate(id, req.body);

    const updated = await News.findById(id);

    return res.json(updated);
  }

  async delete(req, res) {
    const { id } = req.params;

    const news = await News.findById(id);
    if (!news) {
      return res.status(400).json({ erro: 'Registro não encontrado' });
    }

    const mails = await Mail.findOne({ newsId: id });
    if (mails) {
      return res.status(400).json({
        erro:
          'Registro não pode ser excluido, pois possui e-mails relacionados',
      });
    }

    await News.findByIdAndDelete(id);

    return res.json({ ok: 'delete' });
  }

  async show(req, res) {
    const { id } = req.params;

    const news = await News.findById(id);
    if (!news) {
      return res.status(400).json({ erro: 'Registro não encontrado' });
    }

    return res.json(news);
  }

  async index(req, res) {
    const {
      page = 1,
      limits = 14,
      arg = '',
      onlyActive = false,
      type = 'all',
    } = req.query;

    let where = {};

    if (type === 'all') {
      if (onlyActive) {
        where = { activeSite: true };
        if (arg !== '') {
          where = {
            activeSite: true,
            $or: [
              { title: { $regex: arg, $options: 'i' } },
              { edition: { $regex: arg, $options: 'i' } },
              { author: { $regex: arg, $options: 'i' } },
              { data: { $regex: arg, $options: 'i' } },
            ],
          };
        }
      }

      if (!onlyActive) {
        if (arg !== '') {
          where = {
            $or: [
              { title: { $regex: arg, $options: 'i' } },
              { edition: { $regex: arg, $options: 'i' } },
              { author: { $regex: arg, $options: 'i' } },
              { data: { $regex: arg, $options: 'i' } },
            ],
          };
        }
      }
    }

    if (type !== 'all') {
      if (onlyActive) {
        where = { activeSite: true, type };
        if (arg !== '') {
          where = {
            activeSite: true,
            type,
            $or: [
              { title: { $regex: arg, $options: 'i' } },
              { edition: { $regex: arg, $options: 'i' } },
              { author: { $regex: arg, $options: 'i' } },
              { data: { $regex: arg, $options: 'i' } },
            ],
          };
        }
      }
      if (!onlyActive) {
        where = { type };
        if (arg !== '') {
          where = {
            type,
            $or: [
              { title: { $regex: arg, $options: 'i' } },
              { edition: { $regex: arg, $options: 'i' } },
              { author: { $regex: arg, $options: 'i' } },
              { data: { $regex: arg, $options: 'i' } },
            ],
          };
        }
      }
    }

    if (type === 'IE') {
      if (onlyActive) {
        where = { activeSite: true, type: { $ne: 'N' } };
        if (arg !== '') {
          where = {
            activeSite: true,
            type: { $ne: 'N' },
            $or: [
              { title: { $regex: arg, $options: 'i' } },
              { edition: { $regex: arg, $options: 'i' } },
              { author: { $regex: arg, $options: 'i' } },
              { data: { $regex: arg, $options: 'i' } },
            ],
          };
        }
      }
      if (!onlyActive) {
        where = { type: { $ne: 'N' } };
        if (arg !== '') {
          where = {
            type: { $ne: 'N' },
            $or: [
              { title: { $regex: arg, $options: 'i' } },
              { edition: { $regex: arg, $options: 'i' } },
              { author: { $regex: arg, $options: 'i' } },
              { data: { $regex: arg, $options: 'i' } },
            ],
          };
        }
      }
    }

    const response = await News.find(where)
      .sort({ createdAt: -1 })
      .limit(Number(limits))
      .skip((page - 1) * Number(limits));

    return res.json(response);
  }
}

export default new NewsController();
