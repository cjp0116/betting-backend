import Sequelize from 'sequelize';
import db from "../db.js";
import crypto from 'crypto';

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  birthDay: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      isBefore: "01-01-2004"
    }
  },
  profileImage: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  password: {
    type: Sequelize.STRING,
    validate: { min: 6 },
    allowNull: false,
    get() {
      return () => this.getDataValue("password");
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    }
  }
});

User.prototype.correctPassword = function (password) {
  return User.encryptPassword(password, this.salt()) === this.password();
};

User.createSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainTextPassword, salt) {
  return crypto.createHash('RSA-SHA256').update(plainTextPassword).update(salt).digest('hex');
};

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.createSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
}

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => users.forEach(setSaltAndPassword));

export default User;