import Queue from '../../lib/Queue';
import Mail from '../schemas/Mail';

import WorkMail from '../../app/jobs/WorkMail';
import ContactMail from '../../app/jobs/ContactMail';

class MailController {

  async store(req, res) {

    const { tipo } = req.params;

    const form = req.body;

    let work;

    if (tipo === 'contact') {
      work = await Queue.add(ContactMail.key, { form });
    }
    if (tipo === 'work') {
      work = await Queue.add(WorkMail.key, { form });
    }
    if (tipo === 'lote') {

    }

    const sendMail = await Mail.create({ ...req.body, redisId: work.id, status: work.status });

    return res.json(sendMail);
  }

}

export default new MailController();
