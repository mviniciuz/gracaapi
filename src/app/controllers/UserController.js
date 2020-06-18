import User from '../schemas/User';
import * as Yup from 'yup';

import bcrypt from 'bcryptjs';

class UserController {

  async store(req, res) {

    const schema = Yup.object().shape({
      document: Yup.string()
        .required('Favor informar o CPF ou CNPJ do usuário'),
      name: Yup.string()
        .required('Informar o nome do usuário'),
      email: Yup.string()
        .required('Informar o e-mail do usuário')
        .email(),
      password: Yup.string()
        .required('Informar a senha do usuário'),
    });
    await schema.validate(req.body).catch(function (err) {
      return res.json({ erro: err.errors[0] });
    });

    const { document, name, email, admin, password } = req.body;

    const temDocument = await User.findOne({ document });
    if (temDocument) {
      return res.json({ erro: 'Usuário já cadastrado para esse cnpj ou cpf' });
    }
    const temMail = await User.findOne({ email });
    if (temMail) {
      return res.json({ erro: 'Usuário já cadastrado para este e-mail' });
    }

    const password_hash = await bcrypt.hash(password, 8);

    User.create({ document, name, email, admin, password_hash });

    return res.json({ ok: 'Cadastro realizado com sucesso!' });
  }


  async update(req, res) {
    const schema = Yup.object().shape({
      document: Yup.string()
        .required('Favor informar o CPF ou CNPJ do usuário'),
      name: Yup.string()
        .required('Informar o nome do usuário'),
      email: Yup.string()
        .required('Informar o e-mail do usuário')
        .email(),
      oldPassword: Yup.string(),
      password: Yup.string()
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required('Informe a nova senha') : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required('informe a Confirmação de senha').oneOf([Yup.ref('password')]) : field
      ),
    });
    await schema.validate(req.body).catch(function (err) {
      return res.json({ erro: err.errors[0] });
    });


    const user = await User.findById(req.userId);
    const { password_hash } = user;

    const { document, name, admin, email, oldPassword, password } = req.body;

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }
    }

    if (oldPassword && !await bcrypt.compare(oldPassword, password_hash)) {
      return res.json({ error: 'Senha inválida' });
    }

    if (password) {
      const newPassword_hash = await bcrypt.hash(password, 8);
      await user.update({ document, name, email, admin, password_hash: newPassword_hash });
    } else {
      await user.update({ document, name, email, admin });
    }

    const updateUser = await User.findById(req.userId);

    return res.json({
      updateUser
    })
  }

  async show(req, res) {
    return res.json({ ok: 'show' });
  };

  async index(req, res) {
    return res.json({ ok: 'index' });
  }

  async delete(req, res) {
    return res.json({ ok: 'delete' });
  }
}

export default new UserController();
