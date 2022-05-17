import Sequelize from 'sequelize';
import db from "../db.js";

const Bet = db.define("bet", {
  betId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  owner: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  }
});

export default Bet;