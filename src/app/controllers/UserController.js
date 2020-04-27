import User from '../models/user';

class UserController{
  async create(req,res){
    const user = await User.findOne({
      where:{email: req.body.email},
      attributes: ['email']
    });
    
    if(user){
      return res.status(400).json({erro: 'Usuário já existe'})
    }
    const {id, name,email} = await User.create(req.body);
    return res.status(201).json({id,name,email})
  }

  async index(req,res){
    const user = await User.findAll()

    if(!user){
      return res.status(200).send('Não existe usuários');
    }
    return res.status(200).json(user)
  }

  async update(req,res){
    const { email,oldpassword,password } = req.body;
    const user = await User.findByPk(req.userId);
    if (email && (email !== user.email)) {
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

    const userupdate = await user.update(req.body);
    return res.status(200).json(userupdate);
  }

  async delete(req,res){
    const {password}=req.body
    const user = await User.findByPk(req.userId);

    if(!(await user.checkPassword(password))){
      return res.status(401).json({error: 'Senha invalida'})
    }

    await user.destroy()

    return res.status(201).json({
      resultado: 'O aluno foi deletado com sucesso',
    })

  }
}

export default new UserController();
