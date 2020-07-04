import User from '../models/User';

class ProfileController {
  async index(req, res) {
    const { id, name, email, image } = await User.findByPk(req.userId);

    const serializedUser = {
      id,
      name,
      email,
      image_url: `${process.env.APP_URL}/uploads/${image}`,
    };

    res.status(200).json(serializedUser);
  }
}

export default new ProfileController();
