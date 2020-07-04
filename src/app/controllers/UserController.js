/* eslint-disable no-undef */
import * as Yup from 'yup';
import fs from 'fs';
import path from 'path'
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
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
        return res.status(400).json({ erro: 'Esse email já existe' });
      }

      const { id } = await User.create({
        name,
        email,
        password,
        image: req.file.filename,
      });

      return res.status(201).json({ id, name, email });
    } catch (err) {

      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        res.status(400).json(errorMessages)
      }

      await fs.unlinkSync(
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'uploads',
          `${req.file.filename}`
        )
      );

      return res.status(400).json(err);
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email('Digite um email válido'),
        oldpassword: Yup.string().min(
          6,
          'Campo deve ter no minino 6 caracteres'
        ),
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

      const { email, oldpassword } = req.body;
      const user = await User.findByPk(req.userId);
      if (email && email !== user.email) {
        const userExists = await User.findOne({
          where: { email },
          attributes: ['email'],
        });
        if (userExists) {
          return res.status(400).json({ erro: 'Esse email já existe' });
        }
      }

      if (oldpassword && !(await user.checkPassword(oldpassword))) {
        return res.status(401).json({ erro: 'Senha não corresponde' });
      }

      await user.update(req.body);
      if(req.file.filename){
        await fs.unlinkSync(
          path.resolve(__dirname, '..', '..', '..', 'uploads', `${point.image}`)
        );
      }

      return res.status(200).json({ message: 'Usuario atualizado' });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = [];
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        res.status(400).json(errorMessages)
      }
      return res.status(400).json(err);
    }
  }

  async delete(req, res) {
    try {
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

      await user.destroy();

      await fs.unlinkSync(
        path.resolve(__dirname, '..', '..', '..', 'uploads', `${point.image}`)
      );

      return res.status(201).json({
        resultado: 'O Usuario foi deletado com sucesso',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = [];
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        res.status(400).json(errorMessages)
      }
      return res.status(400).json(err);
    }
  }
}

export default new UserController();
