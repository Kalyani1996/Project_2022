import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class a_user extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mobno: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'a_user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "a_user_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
