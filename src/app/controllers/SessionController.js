import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/user';

class SessionController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where:{email: req.body.email},
    });

    if (!user) {
      return res.status(400).json({ erro: 'Usuario não foi encontrado' });
    }
    console.log('adssda')

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ erro: 'Senha não corresponde' });
    }

    console.log('adssda')

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
    
  }
}

export default new SessionController();
