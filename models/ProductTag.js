const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
        //I understand that sequelize auto assigns an id and autoincrements, but because it is specifically asked for in the readme, I have added it
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'product',
          key: 'id',
        },
      },
    },
    tag_id: {
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'tag',
          key: 'id',
        },
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
