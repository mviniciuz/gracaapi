import Mail from '../../../lib/mail';

export default {
  key: 'LoteMail',

  options: {
    delay: 5000,
  },

  async handle({ data }) {
    const { formUpdate } = data;

    await Mail.sendMail({
      to: `${formUpdate.name} <${formUpdate.to}>`,
      subject: `INFORMATIVO`,
      template: 'lote',
      context: {
        title: formUpdate.title,
        edition: formUpdate.edition,
        data: formUpdate.data,
        author: formUpdate.author,
        body: formUpdate.body,
        encoding: 'utf-8',
      },
    });
  },
};
