import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Task from '../models/Task';

class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatorio'),
      priority: Yup.number().required('Prioridade é obrigatoria'),
      deadline: Yup.date().required('Prazo é obrigatorio'),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const { name, priority, deadline } = req.body;

    const hourStart = startOfHour(parseISO(deadline));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({
        error: 'Não é permitido datas passadas',
      });
    }
    const checkDateEquals = await Task.findOne({
      where: {
        user_id: req.userId,
        deadline: hourStart,
      },
      attributes: ['id', 'deadline'],
    });

    if (checkDateEquals) {
      return res
        .status(400)
        .json({ error: 'Já existe uma Task com essa data' });
    }

    const task = await Task.create({
      user_id: req.userId,
      status: true,
      name,
      priority,
      deadline: hourStart,
    });

    return res.status(201).json(task);
  }

  async index(req, res) {
    const tasks = await Task.findAll({
      where: { user_id: req.userId },
    });

    res.status(200).json(tasks);
  }

  async update(req, res) {
    const task = await Task.findByPk(req.params.task_id);

    if (!task) {
      return res.status(404).json({
        message: 'Tarefa não encontrada',
      });
    }

    const { deadline } = req.body;

    const hourStart = startOfHour(parseISO(deadline));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({
        error: 'Não é permitido datas passadas',
      });
    }

    const checkDateEquals = await Task.findOne({
      where: {
        user_id: req.userId,
        deadline: hourStart,
      },
    });

    if (checkDateEquals) {
      return res
        .status(400)
        .json({ error: 'Já existe uma Task com essa data' });
    }

    await task.update(req.body);
    return res.status(200).json({ message: 'Tarefa atualizada' });
  }

  async delete(req, res) {
    const task = await Task.findByPk(req.params.task_id);
    if (!task) {
      return res.status(404).json({
        message: 'Tarefa não encontrada',
      });
    }
    await task.destroy();

    res.status(200).json({ message: 'Tarefa deletada' });
  }
}

export default new TaskController();
