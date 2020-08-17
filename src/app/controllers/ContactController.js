import * as Yup from 'yup';
import Contact from '../schemas/Contact';

class ContactController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      mail: Yup.string()
        .email('Insira um e-mail válido')
        .required('O E-mail é obrigatório'),
      phone: Yup.string(),
      tags: Yup.array(),
      status: Yup.boolean().required('Informe o status'),
    });
    schema.validate(req.body).catch((err) => {
      return res.satus(400).json({ erro: err.errors[0] });
    });

    const { mail, status = true } = req.body;

    const exists = await Contact.findOne({ mail });
    if (exists) {
      return res.status(400).json({ erro: 'E-mail já cadastrado' });
    }

    const response = await Contact.create(req.body);

    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      mail: Yup.string()
        .email('Insira um e-mail válido')
        .required('O E-mail é obrigatório'),
      phone: Yup.string(),
      tags: Yup.array(),
      status: Yup.boolean().required('Informe o status'),
    });
    schema.validate(req.body).catch((err) => {
      return res.status(400).json({ erro: err.errors[0] });
    });

    const { mail } = req.body;
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(400).json({ erro: 'Contato não encontrado' });
    }
    if (contact.mail !== mail) {
      const mailexits = await Contact.findOne({ mail });
      if (mailexits) {
        return res.status(400).json({ erro: 'E-mail já cadastrado' });
      }
    }

    await Contact.findByIdAndUpdate(id, req.body);

    const updated = await Contact.findById(id);

    return res.json(updated);
  }

  async delete(req, res) {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(400).json({ erro: 'Contato não encontrado' });
    }
    await Contact.findByIdAndDelete(id);
    return res.json({ ok: 'delete' });
  }

  async show(req, res) {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(400).json({ erro: 'Contato não encontrado' });
    }
    return res.json(contact);
  }

  async index(req, res) {
    const { page = 1, arg = '' } = req.query;

    let where = {};

    if (arg !== '') {
      where = {
        $or: [
          { name: { $regex: arg, $options: 'i' } },
          { mail: { $regex: arg, $options: 'i' } },
          { phone: { $regex: arg, $options: 'i' } },
        ],
      };
    }

    const response = await Contact.find(where)
      .limit(14)
      .skip((page - 1) * 14);
    return res.json(response);
  }
}

export default new ContactController();
