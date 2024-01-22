'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cuisine.belongsTo(models.User, {foreignKey: 'authorId'})
      Cuisine.belongsTo(models.Category, {foreignKey: 'categoryId'})
    }
  }
  Cuisine.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Name is required`
        },
        notEmpty: {
          msg: `Name is required`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Description is required`
        },
        notEmpty: {
          msg: `Description is required`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Price is required`
        },
        notEmpty: {
          msg: `Price is required`
        },
        min: {
          args: 10000,
          msg: `Price is minimum Rp 10.000`
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Image is required`
        },
        notEmpty: {
          msg: `Image is required`
        },
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id"
      },
      validate: {
        notNull: {
          msg: `Category Id is required`
        },
        notEmpty: {
          msg: `Category Id is required`
        },
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      },
      validate: {
        notNull: {
          msg: `Author Id is required`
        },
        notEmpty: {
          msg: `Author Id is required`
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Cuisine',
  });
  return Cuisine;
};