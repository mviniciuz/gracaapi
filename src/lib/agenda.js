import Agenda from 'agenda';

import Mail from '../lib/mail';

const connectionString = process.env.MONGO_URL;
const agenda = new Agenda({
  db: { address: connectionString, collection: 'agendajobs' },
  defaultConcurrency: 1000000000,
});

agenda.define('sendContact', async (job, done) => {
  const dados = job.attrs.data;
  const { form } = dados;


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

});

agenda.define('sendWork', (job, done) => {
  const dados = job.attrs.data;
  const { form } = dados;
  (async function () {
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
  })();
});

agenda.start();

export default agenda;
