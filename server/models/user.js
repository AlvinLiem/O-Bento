'use strict';
const {
  Model
} = require('sequelize');
const { encodePassword } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Cuisine, {foreignKey: 'authorId'})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email is already registered"
      },
      validate: {
        notNull: {
          msg: `Email is required`
        },
        notEmpty: {
          msg: `Email is required`
        },
        isEmail: {
          msg: `Must use Email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password is required`
        },
        notEmpty: {
          msg: `Password is required`
        },
        len: {
        args: [5],
        msg: `Minimum Password length is 5 characters`
        },        
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: `Staff`
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.password = encodePassword(instance)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};