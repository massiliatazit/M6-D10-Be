module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define(
      "category",
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
        imgURL: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { timestamps: false }
    );
    category.associate = (models) => {
      category.hasMany(models.product);
    };
    return category;
  };