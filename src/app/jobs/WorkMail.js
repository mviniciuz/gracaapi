import Mail from '../../lib/Mail';

class WorkMail {
  get key() {
    return 'WorkMail';
  }


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
  }
}

export default new WorkMail();
