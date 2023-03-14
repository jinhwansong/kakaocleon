import sequelize from "../sequelize";
import { DataTypes } from "sequelize";
const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique:true
  },
  username:DataTypes.STRING,
  thumbnailImagesUrl:{
    type:DataTypes.STRING,
    allowNull:true
  }
});
export default User;