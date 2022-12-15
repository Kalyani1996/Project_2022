import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _a_user from  "./a_user.js";

export default function initModels(sequelize) {
  const a_user = _a_user.init(sequelize, DataTypes);


  return {
    a_user,
  };
}
