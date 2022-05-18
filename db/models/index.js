import User from "./User.js";
import Bet from './Bet.js';
import Address from 'Address.js';

User.hasMany(Bet);
User.hasMany(Address);

export { User, Bet, Address };