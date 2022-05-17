import User from "./User.js";
import Bet from './Bet.js';

User.hasMany(Bet);

export { User };