import { Model, DataTypes, Relationships } from '../deps.ts';
import User from './user.ts';

export default class Todo extends Model {
  static table = 'todos';
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    at: { type: DataTypes.DATETIME, allowNull: true },
    done: { type: DataTypes.BOOLEAN, allowNull: false },
    userId: Relationships.belongsTo(User),
  };

  static defaults = {
    done: false,
  };

  // static user() {
  //   return this.hasOne(User);
  // };
}
