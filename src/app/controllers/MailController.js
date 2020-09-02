import Queue from '../../lib/QueueBull';

import Mail from '../schemas/Mail';
import Contact from '../schemas/Contact';
import News from '../schemas/News';

import WorkMail from '../jobs/bull/WorkMail';
import ContactMail from '../jobs/bull/ContactMail';
import LoteMail from '../jobs/bull/LoteMail';
import SendMail from '../jobs/bull/SendMail';

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
      if (tags.length === 0) contacts = await Contact.find({ status: true });
      else contacts = await Contact.find({ tags: { $in: tags }, status: true });

      contacts.map(async (contact) => {
        const formUpdate = {
          to: contact.mail,
          title: news.title,
          edition: news.edition,
          data: news.data,
          author: news.author,
          body: new Buffer(news.body, 'base64').toString('utf-8'),
        };

        if (news.type === 'I') {
          work = await Queue.add(LoteMail.key, { formUpdate });
        }
        if (news.type === 'E') {
          work = await Queue.add(SendMail.key, { formUpdate });
        }
      });
    }

    const sendMail = await Mail.create(req.body);
    return res.json(sendMail);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const response = await Mail.find()
      .sort({ createdAt: -1 })
      .limit(14)
      .skip((page - 1) * 14);

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
