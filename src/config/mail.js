export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  secure: false,
  default: {
    from: 'Graça Advogados Associados <graca@informa.adv.br>',
  },
  dkim: {
    domainName: process.env.MAIL_DOMAINNAME,
    keySelector: process.env.MAIL_KEYSELECTOR,
    privateKey: process.env.MAIL_PRIVATEKEY,
  },
};

/**
 * Serviços de e-mail que podem ser usados para configuração
 * amazon SES
 * mailgun
 * Sparkpost
 * Mandril (MailClimb)
 *
 */
