import { Sequelize } from 'sequelize';
const db = new Sequelize("postgres://postgres:postgres@localhost:5432/betting");

export default db;