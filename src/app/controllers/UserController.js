import * as Yup from 'yup';
import User from '../models/User';
import deleteImage from '../../utils/functions/deleteImage';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatorio'),
      email: Yup.string()
        .email('Digite um e-mail válido')
        .required('Password é obrigatoria'),
      password: Yup.string()
        .required('Password é obrigatoria')
        .min(6, 'Campo deve ter no minino 6 caracteres'),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const { name, email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: ['email'],
    });

    if (user) {
      await deleteImage(req);
      return res.status(400).json({ erro: 'Esse email já existe' });
    }

    const { id } = await User.create({
      name,
      email,
      password,
      image: req.file === undefined ? null : req.file.filename,
    });

    return res.status(201).json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('Digite um email válido'),
      oldpassword: Yup.string().min(6, 'Campo deve ter no minino 6 caracteres'),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const { name, email, password, oldpassword } = req.body;
    const user = await User.findByPk(req.userId);
    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
        attributes: ['email'],
      });
      if (userExists) {
        await deleteImage(req);
        return res.status(400).json({ erro: 'Esse email já existe' });
      }
    }

    if (oldpassword && !(await user.checkPassword(oldpassword))) {
      await deleteImage(req);
      return res.status(401).json({ erro: 'Senha não corresponde' });
    }

    if (user.image !== null) {
      await deleteImage(req, user.image);
    }

    await user.update({
      name,
      email,
      password,
      image: req.file === undefined ? null : req.file.filename,
    });

    return res.status(200).json({ message: 'Usuario atualizado' });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      password: Yup.string().required('Password é obrigatorio'),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const { password } = req.body;
    const user = await User.findByPk(req.userId);

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha invalida' });
    }

    deleteImage(user.image);

    await user.destroy();

    return res.status(201).json({
      resultado: 'O Usuario foi deletado com sucesso',
    });
  }
}

export default new UserController();
