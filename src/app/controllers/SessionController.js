/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';

import * as Yup from 'yup';
import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async login(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('Password é obrigatorio'),
        password: Yup.string().required('Password é obrigatorio'),
      });

      await schema.validate(req.body, {
        abortEarly: false,
      });

      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email: req.body.email },
      });

      if (!user) {
        return res.status(400).json({ erro: 'Usuario não foi encontrado' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(400).json({ erro: 'Senha não corresponde' });
      }

      const { id, name } = user;

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = [];
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        return res.status(400).json(errorMessages)
      }
      return res.status(400).json(err);
    }
  }
}

export default new SessionController();
