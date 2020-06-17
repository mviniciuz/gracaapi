import Queue from '../../lib/Queue';

import WorkMail from '../../app/jobs/WorkMail';
import ContactMail from '../../app/jobs/ContactMail';

class MailController {
  async store(req, res) {

    const { tipo } = req.params;

    const form = req.body;

    if (tipo === 'contact') {

      await Queue.add(ContactMail.key, { form });
    } else if (tipo === 'work') {
      await Queue.add(WorkMail.key, { form });
    }

    return res.json({});
  }
}

export default new MailController();
