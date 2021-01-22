module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define(
      "product",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        imgURL: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      { timestamps: true }
    );
    product.associate = (models) => {
      product.hasMany(models.review);
      product.belongsTo(models.category);
    };
    return product;
  };