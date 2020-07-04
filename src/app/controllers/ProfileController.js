import User from '../models/User';

class ProfileController {
  async index(req,res){
    const user = await User.findByPk(req.userId)

    const serializedUser = {
      ...user,
      image_url:`${process.env.APP_URL}/uploads/img/${user.image}`
    }

    res.status(200).json(serializedUser)

  }
}

export default new ProfileController();