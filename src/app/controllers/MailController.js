import Queue from '../../lib/Queue';

import Mail from '../schemas/Mail';
import Contact from '../schemas/Contact';
import News from '../schemas/News';

import WorkMail from '../jobs/WorkMail';
import ContactMail from '../jobs/ContactMail';
import LoteMail from '../jobs/LoteMail';

class MailController {
  async store(req, res) {
    const { rota } = req.query;
    const form = req.body;

    let work;
    if (rota === 'contact') {
      work = await Queue.add(ContactMail.key, { form });
    }
    if (rota === 'work') {
      work = await Queue.add(WorkMail.key, { form });
    }
    if (rota === 'lote') {
      const { newsId } = req.body;
      const news = await News.findById(newsId);
      if (!news) {
        return res.status(400).json({
          erro: 'Informe o id do informativo ou noticia para envio',
        });
      }

      let contacts = [];
      const { tags } = req.body;
      if (tags.length === 0) contacts = await Contact.find();
      else contacts = await Contact.find({ tags: { $in: tags } });

      contacts.map(async (contact) => {
        const formUpdate = {
          to: contact.mail,
          title: news.title,
          edition: news.edition,
          data: news.data,
          author: news.author,
          body: new Buffer(news.body, 'base64').toString('utf-8'),
        };
        work = await Queue.add(LoteMail.key, { formUpdate });
      });
    }

    const sendMail = await Mail.create(req.body);
    return res.json(sendMail);
  }

  async index(req, res) {
    const { page = 1, arg = '' } = req.query;

    let where = {};
    if (arg !== '') {
      where = {
        : { $regex: arg, $options: 'i' },
      };
    }

    const response = await Mail.find(where)
      .sort({ createdAt: -1 })
      .limit(10)
      .skip((page - 1) * 10);

    const promises = response.map(async (item) => {
      return {
        mail: item,
        news: await News.findById(item.newsId),
      };
    });

    const mails = await Promise.all(promises);

    return res.json(mails);
  }
}

export default new MailController();
