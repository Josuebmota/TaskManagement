/* eslint-disable no-undef */
import * as Yup from 'yup';
import Task from '../models/Task';

class TaskController {
  async store(req, res) {
    try{

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatorio'),
        priority: Yup.number().required('Prioridade é obrigatoria'),
        deadline: Yup.date().required('Prazo é obrigatorio'),
      });

      await schema.validate(req.body, {
        abortEarly: false,
      });

      const task = await Task.create(req.body, {
        user_id: req.userId,
      });

      return res.status(201).json(task);
  } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = [];
        err.inner.forEach((error) => {
          errorMessages[error.path]= error.message;
        });
        return res.status(400).json(errorMessages)
      }
      return res.status(400).json(err);
    }
  }

  async index(req, res) {
    const tasks = await Task.findAll({
      where: {user_id:req.userId},
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
        }
      ]
    });

    res.status(200).json(tasks)
  }

  async update(req,res){
    const task = await User.findByPk(req.params.id);

    await task.update(req.body);
    return res.status(200).json({ message: 'Usuario atualizado' });
  }
  
  async delete(req,res){
    const task = await Task.findByPk(req.params.id);
    await task.destroy();
    
    res.status(200).json({message: 'Tarefa deletada'})
  }



}

export default new TaskController();
