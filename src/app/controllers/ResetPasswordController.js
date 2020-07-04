import * as Yup from 'yup';
import User from '../models/User';

class ResetPasswordController {
  async reset(req, res) {
    const schema = Yup.object().shape({
      password: Yup.string().min(6).required(),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const user = await User.findByPk(req.userId);

    const { id, name, email, provider } = await user.update(req.body);

    return res.status(200).json({ id, name, email, provider });
  }
}

export default new ResetPasswordController();
