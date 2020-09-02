import Mail from '../../../lib/mail';

class ContactMail {
  get key() {
    return 'ContactMail';
  }

  options() {
    return {
      options: {
        delay: 5000,
      },
    };
  }

  async handle({ data }) {
    const { form } = data;

    await Mail.sendMail({
      to: `${form.name} <${form.to}>`,
      subject: `Formulário de Contato - ${form.name}`,
      template: 'contact',
      context: {
        name: form.name,
        phone: form.phone,
        from: form.from,
        message: form.message,
      },
    });
  }
}

export default new ContactMail();
