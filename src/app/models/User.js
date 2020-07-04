import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        hashpassword: Sequelize.STRING,
        image: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      {
        sequelize: connection,
      }
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.hashpassword = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.hashpassword);
  }
}

export default User;
