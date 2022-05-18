import Sequelize from 'sequelize';
import db from "../db.js";

const Address = db.define({
  belongsTo: {
    type: Sequelize.STRING,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipCode: {
    type: Sequelize.INTEGER,
  },
  state: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  }
});

export default Address;