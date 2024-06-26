const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const User = require("../models/User");

const Designer = sequelize.define("Designer", {
  designer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: "user_id",
    },
  },
  cnic_number: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  cnic_pic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  ratings: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});


module.exports = Designer;
