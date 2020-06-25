import Contact from '../schemas/Contact';
import * as Yup from 'yup';

class ContactController {

  async store(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string(),
      mail: Yup.string()
        .email('Insira um e-mail válido')
        .required('O E-mail é obrigatório'),
      phone: Yup.string(),
      tags: Yup.array(),
    })
    schema.validate(req.body).catch((err) => {
      return res.json({ erro: err.errors[0] })
    });

    const { mail } = req.body

    const exists = await Contact.findOne({ mail });
    if (exists) {
      return res.json({ erro: 'E-mail já cadastrado' });
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
    })
    schema.validate(req.body).catch((err) => {
      return res.json({ erro: err.errors[0] })
    });

    const { mail } = req.body;
    const id = req.params.id;

    const contact = await Contact.findById(id);
    if (contact.mail !== mail) {
      const mailexits = await Contact.findOne({ mail });
      if (mailexits) {
        return res.json({ erro: 'E-mail já cadastrado' });
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
      return res.json({ erro: 'Contato não encontrado' });
    }
    await Contact.findByIdAndDelete(id)
    return res.json({ ok: 'delete' });
  }

  async show(req, res) {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.json({ erro: 'Contato não encontrado' });
    }
    return res.json(contact);
  }

  async index(req, res) {

    const response = await Contact.find({});
    return res.json(response);
  }

}

export default new ContactController();
