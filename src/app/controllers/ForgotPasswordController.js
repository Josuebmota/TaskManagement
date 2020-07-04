import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import Mail from '../../lib/Mail';
import User from '../models/User';

class ForgotPasswordController {
  async forgot(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Digite um e-mail válido')
        .required('E-mail obrigatorio'),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const { email } = req.body;

    const userExists = await User.findOne({
      where: { email: req.body.email },
      attributes: ['id', 'name'],
    });

    if (!userExists) {
      return res.status(400).json({ erro: 'Usuario não existe' });
    }

    const { name, id } = userExists;
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const resetPasswordUrl = `${process.env.FRONT_URL}/reset?token=${token}`;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subeject: 'GerenciadordeTarefas - ForgetPassword',
      template: 'forgotpassword',
      context: {
        name,
        resetPasswordUrl,
      },
    });

    return res.status(200).json({ message: 'E-mail enviado com sucesso' });
  }
}

export default new ForgotPasswordController();
