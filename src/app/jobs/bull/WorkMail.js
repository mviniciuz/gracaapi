import Mail from '../../../lib/mail';

export default {
  key: 'WorkMail',
  options: {
    delay: 5000,
  },

  async handle({ data }) {
    const { form } = data;

    await Mail.sendMail({
      to: `${form.name} <${form.to}>`,
      subject: `Trabalhe Conosco - ${form.name}`,
      template: 'work',
      context: {
        name: form.name,
        phone: form.phone,
        from: form.from,
        message: form.message,
      },
    });
  },
};
