import Mail from '../../../lib/mail';

class SendMail {
  get key() {
    return 'sendMail';
  }

  options() {
    return {
      options: {
        delay: 5000,
      },
    };
  }

  async handle({ data }) {
    const { formUpdate } = data;

    await Mail.sendMail({
      to: `${formUpdate.name} <${formUpdate.to}>`,
      subject: formUpdate.title,
      template: 'mail',
      context: {
        title: formUpdate.title,
        edition: formUpdate.edition,
        data: formUpdate.data,
        author: formUpdate.author,
        body: formUpdate.body,
        encoding: 'utf-8',
      },
    });
  }
}

export default new SendMail();
