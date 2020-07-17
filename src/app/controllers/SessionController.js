import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from '../schemas/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      document: Yup.string().required('Informar o CPF ou CNPJ'),
      password: Yup.string().required('Informar a senha'),
    });
    await schema.validate(req.body).catch(function (err) {
      return res.json({ erro: err.errors[0] });
    });

    const { document, password } = req.body;

    const user = await User.findOne({ document });
    if (!user) {
      return res.json({ erro: 'usuário não encontrado' });
    }

    const { password_hash } = user;

    const checkpassword = await bcrypt.compare(password, password_hash);
    if (!checkpassword) {
      return res.json({ erro: 'Senha inválida' });
    }

    return res.json({
      user,
      token: jwt.sign({ id: user._id }, authConfig.secret, {
        expiresIn: authConfig.expireIn,
      }),
    });
  }
}

export default new SessionController();
