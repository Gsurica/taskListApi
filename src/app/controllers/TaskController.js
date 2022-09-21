const Task = require('../models/Task')
const Yup = require('yup')

class TaskController {
  async index (req, res) {
    const unCheckedTasks = await Task.findAll({
      where: {
        user_id: req.userId,
        check: false,
      }
    })

    return res.json(unCheckedTasks)
  }
  async store (req, res) {
    const schema = Yup.object().shape({
      task: Yup.string().required()
    })
    const { task } = req.body

    if(!(await schema.isValid(req.body))) return res.status(400).json({ error: "Falha ao cadastrar!" })

    const tasks = await Task.create({
      user_id: req.userId,
      task,
    })

    return res.json(tasks)
  }
  async update (req, res) {
    const { task_id } = req.params
    const taskToUpdate = await Task.findByPk(task_id)

    if (!taskToUpdate) return res.status(400).json({ error: "Tarefa não encontrada" })
    if (taskToUpdate.user_id !== req.userId) return res.status(401).json({ error: "Usuário não autorizado a concluir esta tarefa." })

    await taskToUpdate.update(req.body)

    return res.json(taskToUpdate)
  }
  async destroy (req, res) {
    const { task_id } = req.params
    const taskToDelete = await Task.findByPk(task_id)

    if (!taskToDelete) return res.status(400).json({ error: "tarefa não encontrada ou não pode ser deletada!" })
    if (taskToDelete.user_id !== req.userId) return res.status(401).json({ error: "Usuário não autorizado." })

    await taskToDelete.destroy()

    return res.json({ message: "tarefa excluida com sucesso!" })
  }
}

module.exports = new TaskController()
