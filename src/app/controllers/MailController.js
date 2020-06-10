import ContactMail from '../jobs/ContactMail';
import WorkMail from '../jobs/WorkMail';
import Queue from '../../lib/Queue';

class MailController {
  async store(req, res) {

    const { tipo } = req.params;

    const form = req.body;

    let response;

    if (tipo === 'contact') {
      response = await Queue.add(ContactMail.key, { form });
    } else if (tipo === 'work') {
      response = await Queue.add(WorkMail.key, { form });
    }

    return res.json({ status: response.status });
  }
}

export default new MailController();
