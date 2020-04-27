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
}

export default new UserController();
